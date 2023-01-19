require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const userRouter = express.Router();

userRouter.post('/signup',async(req,res)=>{
    try{
        const userData = req.body;
        const userExist = await UserModel.findOne({email:userData.email});
        if(userExist===null){
            userData.password = bcrypt.hashSync(userData.password,10);
            await UserModel.create(userData);
            res.send("user created successfully");
        }else{
            res.status(400).send("user already exist.");
        }
    }catch(e){
        res.status(400).send("something went wrong.")
    }
})

userRouter.post('/login',async(req,res)=>{
    try{
        const userData = req.body;
        const userExist = await UserModel.findOne({email:userData.email});
        if(userExist!==null){
            const same = bcrypt.compareSync(userData.password,userExist.password);
            if(same){
                const token = jwt.sign({"user":userExist},`${process.env.SECRET_KEY}`);
                res.send({"token":token,"message":"login successfull."});
            }else{
                res.status(401).send("authentication failed.");
            }
        }else{
            res.status(400).send("user doesn't exist, please signup first.");
        }
    }catch(e){
        res.status(400).send("something went wrong.")
    }
})


module.exports = userRouter;