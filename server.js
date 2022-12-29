// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();
const User = require('./models/user.js');
const Profiles = require('./models/profiles.js')

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
        tabTitle: 'app Rick Roll',
        });
    });

    // app.get('/profile', (req, res) => {
    //         res.render('sessions/profile.ejs', {
    //         currentUser: req.session.currentUser,
    //         tabTitle: 'Profile',
    //     });
    // });

// N is for NEW
app.get('/newprofile', (req, res) => {
	// step 1) find all available authors from the author collection
	// step 2) provide those authors as a context to the new.ejs template
	User.find({}, (err, user) => {
		res.render('sessions/newprofile.ejs', { user,
            tabTitle: 'New Profile',
            currentUser: req.session.currentUser, });
	});
});
// D is for DELETE

// U is for UPDATE

// C is for CREATE
app.post('/profile', (req, res) => {
    Profiles.create(req.body, (err, createdProfile) => {
		res.redirect('/profile');
	});
});

// E is for EDIT

// S is for SHOW
app.get('/profile/:id', (req, res) => {
    User.findById(req.params.id, (err, profile) => {
		res.render('profile.ejs', { profile });
	});
});



// Shallow route to the route for comment delete function
// app.use('/', articlesController)

// Listening 
app.listen(PORT, () => console.log('express is listening on:', PORT));