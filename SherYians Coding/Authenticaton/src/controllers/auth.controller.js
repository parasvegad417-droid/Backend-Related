const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const registerHandler =async(req,res)=>{
    const { username , email , password } = req.body;
    const isUserAlreadyExists = userModel.find({
        email
    })
    // if(isUserAlreadyExists){
    //     res.status(409).json({
    //         message:"User Already Exists"
    //     });
    // }
    const user = await userModel.create({
        username,
        email,
        password
    })
    const token = jwt.sign({id:user._id},"shhh");
    await res.cookie("token",token);
    res.status(201).json({
        message:"register success",
        user, 
    })
}

module.exports = registerHandler;