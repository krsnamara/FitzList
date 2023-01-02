// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
// Model/Schema links
const User = require('./models/user.js');

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
// const userController = require('./controllers/user');
// app.use('/user', userController);
// const sessionsController = require('./controllers/sessions');
// app.use('/sessions', sessionsController);


// I is for INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', {
        tabTitle: 'Register or Login',
    });
});

app.get('/profiles', (req, res) => {
    User.find({}, (err, users)  => {
        res.render('profiles.ejs', {
            users,
            tabTitle: 'Register or Login',});
    });
});

app.get('/pizza', (req, res) => {
    res.render('pizza.ejs', {
        tabTitle: 'App I want Pizza',
        });
    });

app.get('/forgotten', (req, res) => {
    res.render('forgotten.ejs', {
        tabTitle: 'app Rick Roll',
        });
    });

// N is for NEW
app.get('/profiles/newuser', (req, res) => {
    res.render('newuser.ejs', {
        tabTitle: 'Join us now!',
    });
});

// D is for DELETE
app.delete('/profiles/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/profiles/newuser');
    });
});

// U is for UPDATE
app.put('/profiles/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, users) =>{
        res.redirect('/profiles');
    });
});

// C is for CREATE
app.post('/profiles/newuser', (req, res) => {
    User.create(req.body, (err, users) => {
        console.log(users),
        // res.redirect('/profiles');
        res.send(err);
    });
    console.log(req.body)
});

// E is for EDIT
app.get('/profiles/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, users) =>{
        res.render('editprofile.ejs', {
            users,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
app.get('/profiles/:id', (req, res) => {
    User.findById(req.params.id, (err, users) => {
        res.render('showprofile.ejs', {
            users, 
            tabTitle: 'Its you!',
        });
    }); 
});


// Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));