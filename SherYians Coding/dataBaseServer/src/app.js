const express = require('express');
const noteModel = require("../src/models/noteModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/notes',async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Notes Fetched Success",
        notes:notes
    });
})
app.post('/notes',async (req,res)=>{
    const data = req.body;
    const note = await noteModel.create({
        title:data.title,
        description:data.description
    })
    res.status(200).json({
        message: "Note Recieved"
    })
})

app.delete('/notes/:id',async (req,res)=>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id:id
    });
    res.status(200).json({
        message:"Note deleted Success"
    })
})

app.patch('/notes/:id',async (req,res)=>{
    const id = req.params.id;
    const description = req.body.description;
    await noteModel.findOneAndUpdate({ _id:id},{description:description});
    res.status(200).json({
        message:"Note Updated Successfully"
    });
})
module.exports = app;
