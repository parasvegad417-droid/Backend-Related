const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testApp1");

const userSchema = mongoose.Schema({
    Name:String,
    Email:String,
    ImageUrl:String
});

const users = mongoose.model('user',userSchema);

module.exports=users;