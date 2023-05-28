const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const roomroutes = require('./routes/roomroutes');
const authroutes = require('./routes/authroutes');
const bookingroutes = require('./routes/bookroomroutes');
const app = express();
//middleware
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.get('/', (req, res) => {
    res.send('Welcome to Hotel Booking API');
});

app.use('/api', roomroutes);
app.use('/api', authroutes);
app.use('/api', bookingroutes);
//connecting to database
const port = 3700 || process.env.PORT;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port, () => console.log(`connected to db and Server started on port ${port}`))
    })
    .catch((e) => console.log(e, "error connecting to db!.."));
//routes

// app.get('/favicon.ico', (req, res) => res.status(204));