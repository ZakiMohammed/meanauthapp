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

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (request, response) =>{
    response.send('Invalid end point');
});

// start server
app.listen(port, () => {
    console.log('Server started on port ' + port)
});

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViYzVkNzA0ZWI4NTk5M2IyYzdkODYyNCIsIm5hbWUiOiJKb2huIE1hcnNoYWwiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJqb2huIiwicGFzc3dvcmQiOiIkMmEkMTAkSC4xbXhzZ3ROblo0MWtzSThQMVByLmkyTTN3OWhuOEh3MGtSd1ZqZGw3Y1piN1E3L3pSNjYiLCJfX3YiOjB9LCJpYXQiOjE1Mzk2OTMyOTUsImV4cCI6MTU0MDI5ODA5NX0.K8guAsxL5QyJuGwwPxC-K5Bjg78mSj2FwkdP9NiQkIc