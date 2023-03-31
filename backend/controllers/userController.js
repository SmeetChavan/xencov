const {User} = require('../models/model');

const jwt = require('jsonwebtoken');

const getAllUsers = async (req , res) => {

    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

const postUser = async (req , res) => {

    const {firstName , lastName , password , email , country , mobileNumber} = req.body;

    let runningBalance = {
        wallet : 10000,
        gold : 0,
        goldPrice : 0
    }

    try{

        const posted = await User.create({firstName , lastName , password , email , country , mobileNumber , runningBalance});
        res.status(200).json(posted);
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

const loginUser = async (req , res) => {

    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error : "User not found"});
        }

        if(password !== user.password){
            return res.status(400).json({error : "Incorrect Password"});
        }

        const jwtSecret = "smeetisthebestthenwhylookfortherest";
        const data = {user:{_id: user._id}};

        const authToken = jwt.sign(data , jwtSecret);

        res.status(200).json({user , auth : authToken});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}


const updateUser = async (req , res) => {

    const {email , runningBalance} = req.body;

    try{
        const user = await User.findOneAndUpdate({email : email} , {runningBalance : runningBalance});

        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

module.exports = {postUser , getAllUsers , updateUser , loginUser};