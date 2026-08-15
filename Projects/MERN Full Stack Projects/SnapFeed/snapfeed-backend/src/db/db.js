import 'dotenv/config';
import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log("Connected to DB successfully....");
    }catch(e){
        console.log("Error while connecting to DB ", e);
    }
}

export default connectDB;