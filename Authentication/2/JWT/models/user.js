const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/authTestApp', {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection failed. Start MongoDB on port 27017.', error.message);
});
const userSchema = mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    age:Number
});

const users = mongoose.model('user',userSchema);
module.exports =users;