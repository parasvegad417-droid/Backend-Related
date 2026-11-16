const userModel = require('../models/user.model');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req,res){
    const { username,password,email, role } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            { username },
            { email }
        ]
    })
    if(isUserAlreadyExist) {
        return res.status(409).json({
            message:"User Already Exists"
        })
    }
    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        password:hash, 
        role
    })
    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
    res.cookie('token',token);
    res.status(200).json({
        message:"User Ctreated Successfully !",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function loginUser(req,res){
    const {email,username,password}=req.body;

        const user = await userModel.findOne({
            $or:[{email},{username}]
        })

        if(!user) res.status(409).json({
            message:"Invalid Credential"
        })

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(!isValidPassword){
            res.status(409).json({
            message:"Invalid Credential"
            })
        }
        const token = jwt.sign({
            id:user._id,
            role:user.role,
        },process.env.JWT_SECRET);

        res.cookie("token",token);

        res.status(200).json({
            message:"User Loginned Successfully",
            user:{
                id:user._id,
                usename:user.username,
                email:user.email,
                role:user.role
            }
        })
}

async function logOut(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
}
module.exports = { registerUser , loginUser,logOut};