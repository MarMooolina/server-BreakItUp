const User = require("../models/User.model")
const mongoose = require("mongoose")

exports.editUser = async (req,res,next) => {
    try {
        const {_id} = req.payload
        const { password, email, ...restUser} = req.body
        const updatedUser = await User.findByIdAndUpdate(_id, restUser, {new:true})
        res.status(200).json(updatedUser) 
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
              messageError: "Can't edit user",
            });
          }
          return res.status(500).json({ messageError: error.message });
    }
}