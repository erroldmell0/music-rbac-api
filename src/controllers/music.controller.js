const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {
   const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    });

    res.status(201).json({
        message: 'Music created successfully',
        music
    });
}

async function createAlbum(req, res) {
    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        musics: musics,
        artist: req.user.id,
    });

    res.status(201).json({
        message: 'Album created successfully',
        album
    });
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find().populate('artist', 'username email' );

    res.status(200).json({
        message: 'Musics retrieved successfully', 
        musics
    });
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate('artist', 'username email').populate('musics');

    res.status(200).json({message: 'Albums retrieved successfully', albums});
}

module.exports = {createMusic, createAlbum, getAllMusics, getAllAlbums};