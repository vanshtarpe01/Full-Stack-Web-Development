// Importing Express
const express = require('express');

// Importing notesModel
const noteModel = require('./models/node.model');

// Creating an Express Server
const app = express();
app.use(express.json());

app.get("/notes", async (req, res)=>{
    // findOne({condition}) : It returns only one note that matches and condition and if doesnt match then retun null
    // find() : [{}, {}, {}] or []
    // findOne() : {} or null
    const notes = await noteModel.find();  // It returns and data in the form of array of object if no data is available then return an ematy array
    res.status(200).json({
        message: "Notes fetched successfully",
        notes : notes
    });
});

app.post("/notes", async (req, res)=>{
    const data = req.body; //{title : "", description: ""}
    await noteModel.create({
        title : data.title,
        description : data.description
    });

    res.status(201).json({
        message : "Note created"
    });

});

app.patch("/notes/:id", async (req, res)=>{
    const id = req.params.id;

    const description = req.body.description;

    await noteModel.findOneAndUpdate({
        _id : id
    }, {
        description : description
    });

    res.status(200).json({
        message : "Note updated successfully"
    });
});

app.delete("/notes/:id", async (req, res)=>{
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id : id
    });

    res.status(200).json({
        message : "Note deleted successfully"
    });
});

//Exporting app
module.exports = app;