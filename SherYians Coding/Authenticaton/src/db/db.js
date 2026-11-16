const mongoose = require('mongoose');
async function conectDB(){ 
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/Authentication");
        console.log("Database Connected Successfully ");
    }   
    catch(err){
        console.error("Database connection :",err);
    }
}
module.exports = conectDB;