const musicModel = require('../models/music.model');
const albumModel = require('../models/albums.model');
const { uploadFile } = require('../services/storage.service');

async function createMusic(req, res) {

        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(
            file.buffer.toString('base64')
        );
        const music = await musicModel.create({
            uri: result.url,
            title: title,
            artist: req.user.id
        });
        return res.status(201).json({
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        });
}

async function createAlbum(req,res){

        const {title ,musics} = req.body;
        const album = await albumModel.create({
            title,
            artist:req.user.id,
            musics:musics,
        })
        res.status(201).json({
            message:"Album Created Successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics,
            }
        })

    }

async function getAllMusics(req,res){
    const musics = await musicModel.find()
    .limit(10)// skip()        
    .populate('artist ');
    res.status(200).json({
        message:"Musics fetched Successfully",musics : musics, })}
async function getAllAlbums(req,res){
    const albums = await albumModel.find().select("title artist").populate('artist','username email').populate('musics');
    res.status(200).json({
        message:"Ablum fetched successfully",
        albums:albums,
    })}
async function getAlbumById(req,res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).popoulate("artist","username email");
    return res.status(200).json({
        message:"Album fetched Successfully",
        album:album
    })
}
module.exports = { createMusic , createAlbum , getAllMusics, getAllAlbums, getAlbumById};