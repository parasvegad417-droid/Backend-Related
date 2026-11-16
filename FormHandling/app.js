
const app = express();
// this code is about the form handling in express.js. It uses the express.json() and express.urlencoded() middleware to parse incoming request bodies, allowing the server to handle form submissions and JSON data effectively. The app defines two routes: the root route ("/") and a profile route ("/profile"), each sending a simple response. Finally, the server listens on port 3000 for incoming requests.
app.use(express.json());// this is used to parse the data from the form and send it to the server
app.use(express.urlencoded({ extended: true })); //this is very important to parse the data from the form and send it to the server 

// Your routes here
app.get('/', (req, res) => {
  res.send('Hello World from the main app!');
});

app.get('/profile', (req, res) => {
  res.send('This is the profile page.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});