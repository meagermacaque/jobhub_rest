const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2'))
    .catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/jobs', jobRouter);

app.get('/', (req, res) =>  res.send('Hello, Express ok?!'));
app.listen(process.env.PORT || port, () => console.log(`Server is running on port ${process.env.PORT}`));


// run npm start to test

// need to run "npm i body-parser" for jobRouter