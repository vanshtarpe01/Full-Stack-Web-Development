const transactionModel = require("../models/transaction.model");
const accountModel = require("../models/account.model");
const ledgerModel = require("../models/ledger.model");
const emailSerive = require("../services/email.service");
const mongoose = require("mongoose");

async function createTransaction(){

    /**
     * -Validate Reguest 
     */
    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;

    if(!fromAccount || !toAccount || !amount ||idempotencyKey){
        return res.status(400).json({
            message: "fromAccount, toAccount, amount, idempotencyKey is required"
        });
    }
    

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    });

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    });

    if(!fromUserAccount || !toUserAccount){
        return res.status(404).json({
            message: "Invalid fromAcccount or toAccount"
        });
    }

    /**
     * -Validate IdempotencyKey
     */

    const isTransactionAkreadyExists = await transactionModel.findOne({
        idempotencyKey : idempotencyKey
    });

    if(isTransactionAkreadyExists){
        if(isTransactionAkreadyExists.status == "COMPLETED"){
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAkreadyExists
            });
        }

        if(isTransactionAkreadyExists.status == "PENDING"){
            return res.status(200).json({
                message: "Transaction is stil; processing"
            });
        }
        if(isTransactionAkreadyExists.status == "FAILED"){
            return res.status(500).json({
                message: "Transaction is failed, please retry"
            });
        }
        if(isTransactionAkreadyExists.status == "REVERSED"){
            return re.status(500).json({
                message: "Transaction is reversed, please retry"
            });
        }
    }

    /**
     * -Check Account Status
     */

    if(fromUserAccount.status != "ACTIVE" || toUserAccount.status !="ACTIVE"){
        return res.status(400).json({
            message : "Both fromAccount and toAccount must be active for transaction"
        });
    }

    /**
     * -Derive sender balance from ledger
     */

    const balance = await fromUserAccount.getBalance();

    if(balance< amount){
        return res.status().json({
            message: `Insufficient Balance. Current balance : ${balance} and requested amount : ${amount}` 
        });
    }

    /**
     * -Create Transaction PENDING
     */
    const session = await mongoose.startSession();

    session.startTransaction();

    const transaction = await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    }, {session});

    const debitLedgerEntry = await ledgerModel.create({
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type:"DEBIT"
    }, {session});

    const creditLedgerEntry = await ledgerModel.create({
        account : toAccount,
        amount: amount,
        transaction: transaction._id,
        type:"CREDIT"
    }, {session});


    transaction.status = "COMPLETED" 
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()

    /**
     * -Send Email Notification
     */

    await emailSerive.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount);

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    });

}

async function createInitialFundsTransaction(req, res) {
    const { toAccount, amount, idempotencyKey } = req.body

    if (!toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "toAccount, amount and idempotencyKey are required"
        })
    }

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    })

    if (!toUserAccount) {
        return res.status(400).json({
            message: "Invalid toAccount"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (!fromUserAccount) {
        return res.status(400).json({
            message: "System user account not found"
        })
    }


    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = new transactionModel({
        fromAccount: fromUserAccount._id,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    })

    const debitLedgerEntry = await ledgerModel.create([ {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    } ], { session })

    const creditLedgerEntry = await ledgerModel.create([ {
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    } ], { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()

    return res.status(201).json({
        message: "Initial funds transaction completed successfully",
        transaction: transaction
    })


}

module.exports = {
    createTransaction,
    createInitialFundsTransaction
}