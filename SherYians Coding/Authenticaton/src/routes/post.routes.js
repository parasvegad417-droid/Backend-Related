const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const jwt = require('jsonwebtoken');

router.post('/create',async (req,res)=>{
    const token = req.cookies.token;

    if(!token) res.status(401).json({
        message : "Unauthorized Access"
    })
    try{
        const decode = jwt.verify(token,"shhh")
        const user = await userModel.findOne({
            _id:decode.id 
        })
        console.log(user);
    }
    catch(err){
        console.log(err);
    }
    res.send("post Created Successfully")
})

module.exports = router;