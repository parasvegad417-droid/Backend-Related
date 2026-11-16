const express = require('express');
const app =express();
const path = require('path');
const cookieParser= require('cookie-parser');
const multer = require('multer');
const userModel = require('./models/users');
const postModel = require('./models/post');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'shhh';

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const upload = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, 'public/uploads'),
        filename: (req, file, callback) => {
            const extension = path.extname(file.originalname).toLowerCase();
            callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
        }
    }),
    fileFilter: (req, file, callback) => {
        callback(null, file.mimetype.startsWith('image/'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});


app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/register',async(req,res)=>{
    const { name, username, email, password, age } = req.body;

    const user = await userModel.findOne({ email });
    if (user) return res.status(409).send('User already registered');

    const hash = await bcrypt.hash(password, 10);
    const data = await userModel.create({
        name,
        username,
        email,
        password: hash,
        age

    });
    const token = jwt.sign({ email, userid: data._id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
})

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.redirect('/login');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.redirect('/login');

    const token = jwt.sign({ email, userid: user._id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
});

app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findById(req.user.userid).select('-password').populate('posts');
    if (!user) return res.redirect('/login');
    res.render('profile', { user });
});

app.get('/posts', isLoggedIn, async (req, res) => {
    const posts = await postModel.find({ user: req.user.userid }).sort({ date: -1 });
    res.json(posts);    
});

app.post('/posts', isLoggedIn, upload.single('image'), async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).send('Post content is required');
    const user = await userModel.findById(req.user.userid);
    if (!user) return res.redirect('/login');

    const post = await postModel.create({
        user: user._id,
        content,
        image: req.file ? `/uploads/${req.file.filename}` : undefined
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
});

app.post('/posts/:id/edit', isLoggedIn, upload.single('image'), async (req, res) => {
    const post = await postModel.findOne({ _id: req.params.id, user: req.user.userid });
    if (!post) return res.redirect('/profile');

    post.content = req.body.content;
    if (req.file) post.image = `/uploads/${req.file.filename}`;
    await post.save();
    res.redirect('/profile');
});

app.post('/posts/:id/like', isLoggedIn, async (req, res) => {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.redirect('/profile');

    const userId = req.user.userid;
    const hasLiked = post.likes.some(like => like.toString() === userId);
    if (hasLiked) {
        post.likes.pull(userId);
    } else {
        post.likes.addToSet(userId);
    }
    await post.save();
    res.redirect('/profile');
});

app.post('/profile/update', isLoggedIn, upload.single('profileImage'), async (req, res) => {
    const { name, username, email, age } = req.body;
    const updates = {
        name,
        username,
        email,
        age
    };
    if (req.file) updates.profileImage = `/uploads/${req.file.filename}`;
    await userModel.findByIdAndUpdate(req.user.userid, updates, { runValidators: true });
    res.redirect('/profile');
})

app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/login');
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/login');
    }
}
app.listen(3000);