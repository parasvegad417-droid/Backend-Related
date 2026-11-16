require('dotenv').config();
const app = require('./src/app');
const db = require('./src/db/db');
db();

app.listen(3000,()=>{
    console.log('The Server Is Running On Port No 3000');
})