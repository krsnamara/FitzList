// Dependencies
const express = require('express');
const profileRouter = express.Router();

const Profiles = require('../models/profiles.js');

// Routes

profileRouter.get('/profiles', (req, res) => {
    Profiles.find({}, (err, users)  => {
        res.render('/profiles.ejs', {
            currentUser: req.session.currentUser,
            users,
            tabTitle: 'Register or Login',});
    });
});

// N is for NEW
profileRouter.get('/profiles/newuser', (req, res) => {
    res.render('/newuser.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Join us now!',
    });
});

// D is for DELETE
profileRouter.delete('/profiles/:id', (req, res) => {
    Profiles.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/newuser');
    });
});

// U is for UPDATE
profileRouter.put('/profiles/:id', (req, res) => {
    Profiles.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, users) =>{
        res.redirect('/profiles');
    });
});

// C is for CREATE
profileRouter.post('/profiles', (req, res) => {
    Profiles.create(req.body, (err, users) => {
        // console.log(users),
        res.redirect('/profiles');
        // res.send(err);
    });
    // console.log(req.body)
});

// E is for EDIT
profileRouter.get('/profiles/:id/edit', (req, res) => {
    Profiles.findById(req.params.id, (err, users) =>{
        res.render('/editprofile.ejs', {
            currentUser: req.session.currentUser,
            users,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
profileRouter.get('/profiles/:id', (req, res) => {
    Profiles.findById(req.params.id, (err, users) => {
        res.render('/showprofile.ejs', {
            currentUser: req.session.currentUser,
            users, 
            tabTitle: 'Its you!',
        });
    }); 
});

// Export User Router
module.exports = profileRouter;