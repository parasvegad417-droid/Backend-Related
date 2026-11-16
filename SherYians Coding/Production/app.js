const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const notes = [];
app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/notes',(req,res)=>{
    notes.push(req.body);
    res.status(201).json({
        message : "notes created successfully"
    });
})

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes,
        message:"notes fetched success"
    })
});

app.delete('/notes/:index',(req,res)=>{
    const index = req.params.index;
    delete notes[index];
    res.status(200).json({
        message:"note deleted Success"
    })
})

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index;
    const description = req.body.description;
    const title = req.body.title;

    notes[index].title = title;
    notes[index].description=description;
    res.status(200).json({
        message:"Note Updates Syccessfully"
    })
})

app.listen(3000); 