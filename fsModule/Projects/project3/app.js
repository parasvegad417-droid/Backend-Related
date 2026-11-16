const express = require('express');
const app = express();
const userModel = require('./userModels');

app.get('/',(req,res)=>{
    res.send("hey");
})
app.get('/create',async (req,res)=>{
    let createdUser =await userModel.create(
    {
        name:'Vegad',
        email:'vegaddkuldip420@gmail.com',
        userName:'kuldipbhai Hi'
    });
    res.send(createdUser);
});

app.get('/update',async (req,res)=>{
     let updatedUser = await userModel.findOneAndUpdate({name:'Paras'},{email:'vegadparas417@gmail.com'},{new:true});
     res.send(updatedUser);
})

app.get('/read',async (req,res)=>{
   let users =await userModel.find(); // findOne(we can pas Arguments)
   res.send(users);
})
app.get('/delete',async (req,res)=>{
     let user = await userModel.findOneAndDelete({name:"Vegad"});
    res.send(user);
})

app.listen(3000,()=>{
    console.log('server is runnign at port number 3000');
})