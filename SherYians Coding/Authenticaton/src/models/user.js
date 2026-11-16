const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:{
        type:String
    }
})

module.exports = mongoose.model('user',userSchema);