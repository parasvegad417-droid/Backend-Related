const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image:String,
    caption:String
})
module.exports = mongoose.model("post",postSchema);