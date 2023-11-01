const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2'))
    .catch((err)=>console.log(err));

app.get('/', (req, res) =>  res.send('Hello, Express!'));
app.listen(process.env.PORT || port, () => console.log(`Server is running on port ${process.env.PORT}`));


// run npm start to test