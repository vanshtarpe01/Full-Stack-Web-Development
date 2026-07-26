const {Router} = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const transactionController = require("../controllers/transaction.controller");


const transactionRoutes = Router();

/**
 * -Tranactions -- /api/transactions/
 * -creates a new transaction
 */

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction);

/**
 * -POST /api/transactions/system/inital-funds
 * -Create inital funds
 */

transactionRoutes.post("/system/inital-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction);

module.exports = transactionRoutes;