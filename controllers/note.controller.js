const Note = require ("../models/Note.model")
const mongoose = require("mongoose")

exports.createNote = async (req,res,next)=>{
    try{
        const { title, description, image} = req.body
        const {_id:_owner} = req.payload 
    
        const noteCreated = await Note.create({title, description, image, _owner})
        res.status(201).json(noteCreated)
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Can't create note",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.listNote = async (req,res,next)=>{ 
    try{
        const listNote = await Note.find()
        res.status(200).json(listNote)
    } catch (error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "No notes were found",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.getById = async (req,res,next)=>{
    try {
        const {noteID} = req.params
        if(!mongoose.Types.ObjectId.isValid(noteID)){
            res.status(400).json ({
                messageError: "Can't get note",
                });
            return;
        }
        const detailNote = await Note.findById(noteID)
        res.status(200).json(detailNote)
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Can't get note",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

exports.deleteNote = async ( req,res,next) =>{
    try {
        const { _id } = req.payload
        const {noteID} = req.params
        if(!mongoose.Types.ObjectId.isValid(noteID)){
            res.status(400).json ({
                messageError: "Can't get note",
                });
            return;
        }
        await Note.findByIdAndDelete({_id: noteID, _owner: _id})
        res.status(200).json({messageSuccess: "Note deleted"})
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ messageError: error.message });
                }
                if (error.code === 11000) {
                return res.status(400).json({
                messageError: "Note can't be deleted",
                });
                }
                return res.status(500).json({ messageError: error.message });
        }
}

exports.updateNote = async (req,res,next) =>{
    try {
        const {noteID} = req.params
        if(!mongoose.Types.ObjectId.isValid(noteID)){
            res.status(400).json ({
                messageError: "Can't update note",
                })
            return
        }
        const updateNote = await Note.findByIdAndUpdate(noteID, req.body, {new:true})
        res.status(200).json(updateNote)
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
            }
            if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Can't update note",
            });
            }
            return res.status(500).json({ messageError: error.message });
    }
}

