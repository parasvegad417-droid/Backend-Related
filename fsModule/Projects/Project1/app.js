// 1) dynamic Routing
// 2) how to get datafrom the form and send it to the server
// 3) setting up parser for the form data
// 4) setting up ejs for ejs pages
// 5) setting up the static files for the ejs pages

const express = require('express');
const app = express();
const path = require('path');
app.use(express.json()); // this is used to parse the data from the form and send it to the server
app.use(express.urlencoded({ extended: true })); // this is very important to parse the data from the form and send it to the server
app.set('view engine', 'ejs'); // usd to render the ejs pages
app.use(express.static(path.join(__dirname, 'public'))); // used to set up the static files for the ejs pages

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/profile/:paras', (req, res) => {// paras is the dynamic parameter which is passed in the url
  res.send(`This is the profile page of ${req.params.paras}`);
//   res.render('profile', { title: 'Profile' });
});

app.get('/author/:username/:age', (req, res) => {// paras is the dynamic parameter which is passed in the url
  res.send(req.params);
//   res.render('profile', { title: 'Profile' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
