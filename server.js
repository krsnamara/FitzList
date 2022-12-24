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

app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('profile.ejs', {
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


// Shallow route to the route for comment delete function
// app.use('/', articlesController)

// Listening 
app.listen(PORT, () => console.log('express is listening on:', PORT));