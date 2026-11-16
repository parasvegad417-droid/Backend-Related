const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/create',async (req,res)=>{
    let users =await userModel.create({
         username:"paras",
         age:22,
         email:"parasvegag417@gmail.com "
    })
    res.send(users);
})

app.get('/create/post',async (req,res)=>{
    let post = await postModel.create({
        postData:"Hello Bhai",
        user:"6a8941b986d3d56164c225cf",
 })
 let user = await userModel.findOne({_id:"6a8941b986d3d56164c225cf"});
 user.posts.push(post._id);
 await user.save();
 res.send({post,user});
});

app.listen(3000);