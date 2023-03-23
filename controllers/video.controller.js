const router = require("express").Router();
const axios = require("axios")
const Video = require ("../models/Video.model")
const mongoose = require ("mongoose")

exports.getByID = async (req,res,next) =>{
    try {
        const { videoId } = req.params
        if(!mongoose.Types.ObjectId.isValid(videoId)){
            return;
        }
        const videoFav = await Video.findById(videoId)
        res.status(200).json(videoFav)
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Video not found",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.videoCtrl = async (req,res,next) =>{
    try {
        const { videoYou } = req.params
        const { title, videoId, image } = req.body
        const { _id } = req.payload

        const videoExist = await Video.findOne({videoId: videoYou, _owner: _id})
        if(videoExist){
            await Video.findByIdAndRemove(videoExist._id)
            return res.status(200).json({messageSuccess: "Video deleted"})
        }

        const videoFav = await Video.create({title, videoId, image, _owner: _id})
        res.status(200).json(videoFav)
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Error saving/deleting video",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.listVideo = async (req,res,next)=>{
    try{
        const { _id } = req.payload
        const listVideo = await Video.find({_owner: _id})
        res.status(200).json(listVideo)
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "No videos found",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.randomVideo = async (req,res,next)=>{
    try{
        const infoVideos = await axios.get(`${process.env.URL_YOUTUBE}/search?key=${process.env.KEY_YOUTUBE}&type=video&part=snippet&q=yoga+estiramiento+respiracion+relajacion+meditacion`)
        const randomId = Math.floor(Math.random() * infoVideos.data.items.length)
        const dataVideo = infoVideos.data.items[randomId]
        const responseVideo = {
            title: dataVideo.snippet.title,
            videoId: dataVideo.id.videoId,
            image: dataVideo.snippet.thumbnails.default.url,
            url: `https://www.youtube.com/embed/${dataVideo.id.videoId}`
        }

        res.status(200).json(responseVideo)

    } catch (error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Can't display a random video",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}