const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'artist') {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
    
        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        });

        res.status(201).json({
            message: 'Music created successfully',
            music
        });

    } catch (err) {
    console.error('Create music error:', err);
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
}

}

async function createAlbum(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'artist') {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }

        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            musics: musics,
            artist: decoded.id,
        });

        res.status(201).json({
            message: 'Album created successfully',
            album
        });
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    createMusic,
    createAlbum
};