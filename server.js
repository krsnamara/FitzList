// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
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
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// To link static directory/file 
app.use(express.static('.'));

// Controllers
const userController = require('./controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
const eggsController = require('./controllers/eggs.js');
app.use(eggsController);
const profilesController = require('./controllers/profiles.js');
app.use('/profiles', profilesController);

// Index Route
app.get('/', (req, res) => {
        res.render('index.ejs', {
            currentUser: req.session.currentUser,
            tabTitle: 'Register or Login',
        });
    });

// Listening 
app.listen(PORT, () => console.log('express is listening on:', PORT));