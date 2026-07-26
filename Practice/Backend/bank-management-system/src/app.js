const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const app = express();
// Express server is not capable for reading data directly from body so that why we are using middleware that is express.json() 
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRoutes);
module.exports = app;