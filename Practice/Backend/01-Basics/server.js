// Importing the Express Module
const express = require('express');
// Calling the Express for Creating the Server
const app = express();  // It is used to create an instance of an expresss

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.get("/about", (req, res)=>{
    res.send("About Page");
});

app.get("/home", (req, res)=>{
    res.send("Home Page");
});

// Start the Server on poort no 3000
app.listen(3000, ()=>{  // It is used to start an express server
    console.log("Server is running on port number 3000");
});

// npm i -y : It is usedto initiate the node js application
// npm i express : It is used to instal express package
// Port : It is a number used to communicate the application
// req(Request) : Request are come from a frontend and we need to give an resonse of that req.
// res(Response) : Response is given by the backend to the user/frontend based on a particular request