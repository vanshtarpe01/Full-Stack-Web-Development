const { log } = require("console");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connected to db");
    }catch(e){
        console.log("Error in connecting with database : ", e);
        process.exit(1);
    }
}

module.exports = connectDB;