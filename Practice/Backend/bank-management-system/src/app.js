const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const app = express();
// Express server is not capable for reading data directly from body so that why we are using middleware that is express.json() 
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

module.exports = app;