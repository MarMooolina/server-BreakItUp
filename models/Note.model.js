
const { Schema, model } = require("mongoose")

const noteSchema = new Schema({
    title:{
        type: String,
        required: true,
        minLength: 4
    },
    description:{
        type: String,
        required: true,
        minLength:5
    },
    image:{
        type: String,
    },
    _owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamp: true})


module.exports = model("Note", noteSchema)