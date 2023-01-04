// Dependencies
const express = require('express');
const profilesRouter = express.Router();
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const session = require('express-session');
const checkAuth = require('../middleware/checkauth.js')
const User = require('../models/user.js');
const Profiles = require('../models/profiles');

// Routes

profilesRouter.get('/profiles', (req, res) => {
    Profiles.find({}, (err, profile)  => {
        res.render('profiles/profiles.ejs', {
            currentUser: req.session.currentUser,
            profile,
            tabTitle: 'Profiles Index',});
    });
});

// N is for NEW
profilesRouter.get('/profiles/newuser', checkAuth, (req, res) => {
    res.render('profiles/newprofile.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Join us now!',
    });
});

// D is for DELETE
profilesRouter.delete('/profiles/:id', (req, res) => {
    Profiles.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/newuser');
    });
});

// U is for UPDATE
profilesRouter.put('/profiles/:id', (req, res) => {
    Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, profile) =>{
        res.redirect('/profiles');
    });
});

// C is for CREATE
profilesRouter.post('/profiles', (req, res) => {
    Profiles.create(req.body, (err, profile) => {
        // console.log(users),
        res.redirect('/profiles');
        // res.send(err);
    });
    // console.log(req.body)
});

// E is for EDIT
profilesRouter.get('/profiles/:id/edit', (req, res) => {
    Profiles.findById(req.params.id, (err, profile) =>{
        res.render('profiles/editprofile.ejs', {
            currentUser: req.session.currentUser,
            profile,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
profilesRouter.get('/profiles/:id', (req, res) => {
    Profiles.findById(req.params.id, (err, profile) => {
        res.render('profiles/showprofile.ejs', {
            currentUser: req.session.currentUser,
            profile, 
            tabTitle: 'Its you!',
        });
    }); 
});

// Export User Router
module.exports = profilesRouter;