const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const tasksDir = path.join(__dirname, 'tasks');

  fs.readdir(tasksDir, (err, files) => {
    if (err) {
      console.error('Error reading tasks folder:', err);
      return res.status(500).send('Could not read tasks folder');
    }
    res.render('index', { title: 'Home', files :files });
  });
});
app.post('/create', (req, res) => {
  fs.writeFile(`./tasks/${req.body.taskName.split(" ").join("")}.txt`, req.body.taskDescription, (err) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).send('Could not create task');
    }
    res.redirect('/');
  });
});
app.get('/task/:taskName', (req, res) => {
  fs.readFile(`./tasks/${req.params.taskName}`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading task file:', err);
      return res.status(404).send('Task not found');
    }
    res.render('task', { title: req.params.taskName, content:data });
  });
});

app.get('/edit/:taskName', (req, res) => {
  fs.readFile(`./tasks/${req.params.taskName}`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading task file:', err);
      return res.status(404).send('Task not found');
    }
    res.render('edit', { title: `${req.params.taskName}`, content: data});
  });
});
app.post('/edit',(req,res)=>{
  fs.rename(`./tasks/${req.body.Previous}`,`./tasks/${req.body.New}`,(err)=>{
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});