const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.services");
const albumModel = require("../models/album.model");
 

/*
async function createMusic(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(409).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "Forbidden : You don't have access to create an music"
            });
        }


        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music.id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (err) {
        console.log(err);
        
        return res.status(409).json({
            message: "Unauthorized"
        });
    }
}
    */


// Using middleware

async function createMusic(req, res) {
        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music.id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });
}

/*
async function createAlbum(req, res){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "You don't have access to create an album"
            });
        }

        const { title, musicIds } = req.body;

        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musicIds
        });

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(401).json({message : "Unauthorized"});
    }

}

module.exports = { createMusic, createAlbum };
*/


// Using middleware
async function createAlbum(req, res){

        const { title, musicIds } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musicIds
        });

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

}

async function getAllMusics(req, res){
    const musics = await musicModel.find().populate("artist");

    res.status(200).json({message: "Musics fetched successfully", musics: musics});
}

async function getAllAlbums(req, res){
    const albums = await albumModel.find();

    res.status(200).json({message: "Albums fetched successfuly", albums: albums});
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums };