require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const sendEmail = require("../services/email.service");

/**
* - user regisetr controller
* - POST /api/auth/register
*/

async function userRegisterController(req, res){
    const {email, name, password} = req.body;

    const isExists = await userModel.findOne({
        email : email
    });

    if(isExists){
        return res.status(422).json({
            message: "User already exists with email",
            status: "Failed"
        });
    }

    const user = await userModel.create({
        email, name, password
    });

    const token = jwt.sign({userId: user._id}, process.env.JSON_SECRECTKEY, {expiresIn: "3d"});

    res.cookie("token", token);


    res.status(201).json({
        message: "User created successfully",
        user:{
            _id:user._id,
            email: user.email,
            name: user.name
        },
        token
    });

    await sendEmail.sendRegisterationEmail(user.email, user.name);

}

/**
* - User Login Controller
* - POST /api/auth/login
*/

async function userLoginController(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({
            message: "Email or password is INVALID"
        });
    }

    const isValidPassword = user.comparePassword(password);

    if(!isValidPassword){
        return res.status(401).json({
            message: "Email or password is INVALID"
        });
    }

    const token = jwt.sign({userId: user._id}, process.env.JSON_SECRECTKEY, {expiresIn: "3d"});

    res.cookie("token", token);

    res.status(200).json({
        message: "User login successfully",
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
         token
    })
}

module.exports = {
    userRegisterController,
    userLoginController
};

