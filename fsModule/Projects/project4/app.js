const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userModel= require('./models/user');
const users = require('./models/user');

const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index");
});
app.get('/read',async (req,res)=>{
    const allUsers = await userModel.find();
    res.render('read',{users:allUsers});
});

app.get('/edit/:id',async (req,res)=>{
 let user1 = await userModel.findOneAndUpdate({_id:req.params.id});
 res.render('edit',{user:user1});
});

app.post('/update/:id',async (req,res)=>{
    let {ImageUrl,Name,Email} = req.body;
    let user1= await userModel.findOneAndUpdate({_id:req.params.id},{Name,Email,ImageUrl},{new:true});
    res.redirect('/read');
});

app.get('/delete/:id',async(req,res)=>{
    let user1 = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/read');
});

app.post('/create',async (req,res)=>{
    const {Name,Email,ImageUrl}= req.body;
   let createdUser =  await userModel.create({
        Name,
        Email,
        ImageUrl
    });
    res.redirect('/');
});

app.listen(3000,()=>{
     console.log("Hello World");
});