const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.services');
const postModel = require("./models/post.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// npm i multer : middle ware for file{form-data}
const upload = multer({ storage: multer.memoryStorage() });


app.post('/create-post', upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);

    console.log(result);

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });

    res.status(201).json({
        message: "Post created successfully",
        post
    });
});

app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
});

module.exports = app;


/*
Colud Storage Provider for storing files
    IMP: Cloud Storage Provider mainly depend on pricing and service
    1. ImageKit
    2. Cloudinary
    3. Amazon S3[Bucket] {S3 :- Simple Storage Service}
*/