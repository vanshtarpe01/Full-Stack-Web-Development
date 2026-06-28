// const app = require("./src/app");

import app from "./src/app.js";
import "dotenv/config"
const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});  
