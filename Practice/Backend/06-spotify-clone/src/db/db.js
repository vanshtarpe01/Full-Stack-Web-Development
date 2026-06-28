require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"])

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected successfully");
        
    } catch (err) {
        console.log("Error in connecting database : ", err);
        
    }
}

module.exports = connectDB;