const { hash } = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(cookieParser());     

app.get('/',(req,res)=>{
    res.cookie("Name","Paras");
    res.send("done");
})

app.get('/read',(req,res)=>{
    console.log(req.cookies);
    res.send("Read Page");
})

app.get('/pass',(req,res)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash("password",salt,(err,hash)=>{
            console.log(hash);
        })
    })
    bcrypt.compare("password","$2b$10$qJFSahVFxQML3cxjUTbcCexMko0BntLUL1x.DpiSQzY.ieCZUc4li",(err,result)=>{
        console.log(result);
        res.send("password Encrypted successfully");
    })
})

app.listen(3000,(err)=>{
    if(err)console.log(err);
    console.log("server is running");
})