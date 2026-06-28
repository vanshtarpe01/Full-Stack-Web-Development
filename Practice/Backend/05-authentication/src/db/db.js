require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

async function connectDB() {

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Database connected successfully");
        
    } catch (err) {
        console.log("Database connnection error : ", err);
        
    }

}

module.exports = connectDB;