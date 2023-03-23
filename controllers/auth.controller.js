const bcryptjs = require ("bcryptjs")
const jwt = require ("jsonwebtoken")
const express = require ("express")
const mongoose = require ("mongoose")
const User = require("../models/User.model")

const saltRounds = 10;

exports.signupCtrl = async (req,res,next) =>{
    try {
        const {email, password, username} = req.body

        //Inputs - Validation
        if(email === '' || password === '' || username === ''){
            res.status(400).json({messageError: "All fields are required"})
            return;
        }   

        //Email - Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if( !emailRegex.test(email) ){
            res.status(400).json({messageError: "Send the email structure: it need an @, .com"})
            return;
        }

        //Password - Validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if( !passwordRegex.test(password) ){
            res.status(400).json({messageError: "Password should contain at least 6 characters, a capital letters and a number"})
            return;
        }

        //User - Validation
        const foundUser = await User.findOne({email})
        if(foundUser){
            res.status(400).json({messageError: "User already registered"})
            return;
        }

        //Salt
        const salt = bcryptjs.genSaltSync(saltRounds)
        const hashedPassword = bcryptjs.hashSync(password,salt)
        
        const {
            email: emailCreated,
            username: usenamerCreated,
            _id
        } = await User.create({email, username, password: hashedPassword})
        const payload = {
            email: emailCreated,
            user: usenamerCreated,
            _id
        }
        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "6h"}    
        )

        res.status(202).json({authToken})

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
            messageError: "Signup error",
            });
          }
          return res.status(500).json({ messageError: error.message });
    }
}

exports.loginCtrl = async(req,res,next)=>{
    try {
        //Inputs - Validation 
        if(req.body.email === '' || req.body.password === ''){
            res.status(400).json({messageError: "Wrong credentials"})
            return;
        }

        const foundUser = await User.findOne({email: req.body.email})

        if(!foundUser){
            res.status(401).json({messageError: "User not found"})
            return;
        }

        const passwordCorrect = bcryptjs.compareSync(req.body.password, foundUser.password)

        if(passwordCorrect){
            const { _id, email, username } = foundUser
            const payload = { _id, email, username }

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                {algorithm: "HS256", expiresIn: "6h"}    
            )
            res.status(200).json({authToken})

        }else{
            res.status(401).json({messageError: "User not found"})
            return;
        }
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
                messageError: "Login Error",
            });
          }
          return res.status(500).json({ messageError: error.message });
    }
}

exports.verifyCtrl = (req,res,next)=>{
    res.status(200).json(req.payload)
}