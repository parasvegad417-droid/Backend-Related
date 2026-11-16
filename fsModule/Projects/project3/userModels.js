const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractise`);

const userSchema = mongoose.Schema({
    name:String,
    userName:String,
    email:String
});

const users = mongoose.model('user',userSchema);

module.exports = users;