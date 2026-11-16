const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get('/',(req,res)=>{
   let token = jwt.sign({email:"parasvegda417@gmail.com"},"secret");
   console.log(token);
   res.cookie("token",token);   
   res.send("done");
})
app.get('/read',(req,res)=>{
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("Done Ho Bhai");
})

app.listen(3000,(err)=>{
console.log("hello world ")
;});