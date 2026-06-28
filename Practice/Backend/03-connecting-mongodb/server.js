// Importing app
const app = require('./src/app');

//  Importing db.js
const connectDB = require('./src/db/db');

connectDB(); // Calling connect DB.

// Starting an express server on port 3000
app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
