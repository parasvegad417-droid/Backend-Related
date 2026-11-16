const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/postModel');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({storage :multer.memoryStorage()});

app.use(express.urlencoded({extended:true}));

app.post('/create-post',upload.single("image"), async(req,res)=>{
   const result =await uploadFile(req.file.buffer);
   const posts = postModel.create({
      image:result.url,
      caption:req.body.caption
   })
   return res.status(200).json({
      message:"post created Successfuly",
   })
})

app.get('/posts',async(req,res)=>{
   const posts = await postModel.find();
   res.status(200).json({
      message:"post fetched successfully",
      posts:posts
   })
})

module.exports = app;