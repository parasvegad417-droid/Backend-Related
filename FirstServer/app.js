const express= require('express');

const server = express();

server.get('/',(req,res)=>{
    res.send("This Is The Home Page");
})
server.get('/profile',(req,res)=>{
    res.send("Hawlo this is the profile page");    
})

server.listen(3000,()=>{
    console.log('server is running in port 3000');
})
