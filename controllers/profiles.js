// Dependencies
const express = require('express');
const profilesRouter = express.Router();
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const session = require('express-session');
const checkAuth = require('../middleware/checkauth.js')
const User = require('../models/user.js');
const Profiles = require('../models/profiles.js');

// Routes

profilesRouter.get('/profiles', (req, res) => {
    Profiles.find({}, (err, users)  => {
        res.render('profiles/profiles.ejs', {
            currentUser: req.session.currentUser,
            users,
            tabTitle: 'Profiles Index',});
    });
});

// N is for NEW
profilesRouter.get('/profiles/newuser', (req, res) => {
    res.render('profiles/newprofile.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Join us now!',
    });
});

// D is for DELETE
profilesRouter.delete('/profiles/:id', (req, res) => {
    Profiles.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('profiles/newuser');
    });
});

// U is for UPDATE
profilesRouter.put('/profiles/:id', (req, res) => {
    Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, users) =>{
        res.redirect('profiles/profiles');
    });
});

// C is for CREATE
profilesRouter.post('/profiles', (req, res) => {
    Profiles.create(req.body, (err, users) => {
        // console.log(users),
        res.redirect('profiles/profiles');
        // res.send(err);
    });
    // console.log(req.body)
});

// E is for EDIT
profilesRouter.get('/profiles/:id/edit', (req, res) => {
    Profiles.findById(req.params.id, (err, users) =>{
        res.render('profiles/editprofile.ejs', {
            currentUser: req.session.currentUser,
            users,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
profilesRouter.get('/profiles/:id', (req, res) => {
    Profiles.findById(req.params.id, (err, users) => {
        res.render('profiles/showprofile.ejs', {
            currentUser: req.session.currentUser,
            users, 
            tabTitle: 'Its you!',
        });
    }); 
});

// Export User Router
module.exports = profilesRouter;