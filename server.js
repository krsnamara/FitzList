// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// DB Config
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());

// To link state directory/files
app.use(express.static('.'));

// Controllers
const mainController = require('./controllers/main.js');
app.use(mainController);
// const sessionsController = require('./controllers/sessions');
// app.use('/sessions', sessionsController);

// I is for INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', {
        tabTitle: 'Register or Login',
    });
});

// Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));