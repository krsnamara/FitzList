// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// DB config
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
app.use(express.urlencoded({ extended: false }));
app.use(
        session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
        }));
app.use(methodOverride('_method'));
app.use(express.json());

// To link static directory/file 
app.use(express.static('.'));

// Controllers
const userController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
app.use('/users', userController);
app.use('/sessions', sessionsController);

// Routes
// I is for INDEX
// framework but never working if else to show profile if session exists
app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('sessions/profile.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Profile',
    });
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            tabTitle: 'Register or Login',
        });
    }
});

app.get('/pizza', (req, res) => {
    res.render('pizza.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'App I want Pizza',
        });
    });

app.get('/forgotten', (req, res) => {
    res.render('forgotten.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Rick Roll',
        });
    });

// N is for NEW

// D is for DELETE

// U is for UPDATE

// C is for CREATE

// E is for EDIT

// S is for SHOW




// Shallow route to the route for comment delete function
// app.use('/', articlesController)

// Listening 
app.listen(PORT, () => console.log('express is listening on:', PORT));