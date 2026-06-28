require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);

    console.log("Connect to DB");
}

module.exports = connectDB;