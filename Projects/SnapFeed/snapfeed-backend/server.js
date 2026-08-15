import 'dotenv/config'
import app from "./src/app.js";
import connectDB from './src/db/db.js';

connectDB();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});


// vanshvtarpe_db_user
// 9aglSdUopdG0E81x

// mongodb+srv://vanshvtarpe_db_user:9aglSdUopdG0E81x@cluster0.efjgppt.mongodb.net/