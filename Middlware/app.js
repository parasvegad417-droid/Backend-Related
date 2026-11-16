const express = require('express');
const server = express();
// middaleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

server.use((req,res,next)=>{
    console.log("Hello World");
    next();
});
server.use((req,res,next)=>{
    console.log("Hello World This is from Tenis");
    next();
});

server.get('/',(req,res)=>{
    res.send("This is Paras Wh0 loves Tenisha but it is one sided hihihhiihihihi...... !");
});
server.get('/profile',(req,res)=>{
    return next(new Error('someThing Went Wrong'));   
});
// error middlware
server.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send("Something is wrong in your code !");
});

server.listen(4000,()=>{
    console.log("Hello World");
})