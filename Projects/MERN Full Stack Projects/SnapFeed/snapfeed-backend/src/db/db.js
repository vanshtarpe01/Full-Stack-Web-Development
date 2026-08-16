import 'dotenv/config';
import mongoose from 'mongoose';

import dns from 'dns';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB(){
    if (!process.env.MONGO_CONNECTION_URL) {
        throw new Error("MONGO_CONNECTION_URL is not defined");
    }

    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL, {
            serverSelectionTimeoutMS: 10000
        });
        console.log("Connected to DB successfully....");
    }catch(e){
        console.log("Error while connecting to DB ", e.message);
        throw e;
    }
}

export default connectDB;
