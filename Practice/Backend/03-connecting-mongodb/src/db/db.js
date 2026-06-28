const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

async function connectDB() {
    
    // halley : Database name 
    // Two main Task of mongoose.connect()
    // 1. It connect database to the server
    // 2. If the database is not create, then it will create an database
    // mongodb+srv://backend:EN5SGRS1et7DJJLd@learningbackend.wfsni5f.mongodb.net/ this is an Coonecting Url amd it helps to connect with the cluster
    // mongodb+srv://backend:EN5SGRS1et7DJJLd@learningbackend.wfsni5f.mongodb.net/halley : halley is an database name if it is present then directly connect, else it will create a new database with name halley and connect
    await mongoose.connect("mongodb+srv://backend:EN5SGRS1et7DJJLd@learningbackend.wfsni5f.mongodb.net/halley"); 
    // It is used to connect server to database

    console.log("Conected to DB");
    
}

module.exports = connectDB;