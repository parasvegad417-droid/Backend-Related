const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser= require('cookie-parser');
const musicRoutes = require('./routes/music.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);


module.exports = app;
