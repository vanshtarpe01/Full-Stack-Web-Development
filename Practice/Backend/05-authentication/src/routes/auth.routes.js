const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);

router.get("/test", (req, res)=>{
    console.log(req.cookies);

    res.json({
        message : "Test Route",
         cookie : req.cookies
    })
    
});

module.exports = router;