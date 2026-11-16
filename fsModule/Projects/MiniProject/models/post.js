const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    image:String,
    date:{
        type:Date,
        default:Date.now
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
});

module.exports = mongoose.model('post',postSchema);