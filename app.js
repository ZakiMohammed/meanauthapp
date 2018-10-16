const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

const app = express();
const port = 3000;
const users = require('./routes/users');

// connect to db
mongoose.connect(config.database);
mongoose.connection.on('connected', () =>{
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', () => {
    console.log('Database connection error ' + config.database);
});

// cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

// bodyParser middleware
app.use(bodyParser.json());

app.use('/users', users);

// index route
app.get('/', (request, response) =>{
    response.send('Invalid end point');
});

// start server
app.listen(port, () => {
    console.log('Server started on port ' + port)
});