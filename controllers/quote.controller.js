
const router = require("express").Router();
const axios = require("axios")
const Quote = require ("../models/Quote.model")
const mongoose = require ("mongoose")

exports.listQuotes = async (req,res,next)=>{
    try{
        const listQuotes = await Quote.find()
        res.status(200).json(listQuotes)
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "No quotes found",
            });
            }
            return res.status(500).json({ messageError: error.message });
     }
}

exports.quoteCtrl = async (req,res,next) =>{
    try {
        const { q,a,h } = req.body
        const { _id } = req.payload
        const quoteExist = await Quote.findOne({quote: q, author: a, _owner: _id})
        if(quoteExist){
            await Quote.findByIdAndRemove(quoteExist._id)
            return res.status(200).json({messageSuccess: "Quote deleted"})
        }

        const quoteFav = await Quote.create({quote: q, author: a, _owner: _id})
        res.status(200).json(quoteFav)
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Error saving/deleting quote",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.getRandomQuote = async (req,res,next) =>{
    try {
        const responseQuote = await axios.get("https://zenquotes.io/api/random")
        res.status(200).json({quote: responseQuote.data[0]})
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Error random quote",
            });
            }
            return res.status(500).json({ messageError: error.message });
        
    }
}
