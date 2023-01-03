// Dependencies
const express = require('express');
const mainRouter = express.Router();

const Profilesrebuild = require('../models/profilesrebuild.js');

// Routes

mainRouter.get('/profiles', (req, res) => {
    Profilesrebuild.find({}, (err, users)  => {
        res.render('main/profiles.ejs', {
            users,
            tabTitle: 'Register or Login',});
    });
});

mainRouter.get('/pizza', (req, res) => {
    res.render('main/pizza.ejs', {
        tabTitle: 'App I want Pizza',
        });
    });

mainRouter.get('/forgotten', (req, res) => {
    res.render('main/forgotten.ejs', {
        tabTitle: 'app Rick Roll',
        });
    });

mainRouter.get('/underconstruction', (req, res) => {
    res.render('main/underconstruction.ejs', {
        tabTitle: 'Coming Soon!',
        });
    });

// N is for NEW
mainRouter.get('/profiles/newuser', (req, res) => {
    res.render('main/newuser.ejs', {
        tabTitle: 'Join us now!',
    });
});

// D is for DELETE
mainRouter.delete('/profiles/:id', (req, res) => {
    Profilesrebuild.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/newuser');
    });
});

// U is for UPDATE
mainRouter.put('/profiles/:id', (req, res) => {
    Profilesrebuild.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, users) =>{
        res.redirect('/profiles');
    });
});

// C is for CREATE
mainRouter.post('/profiles', (req, res) => {
    Profilesrebuild.create(req.body, (err, users) => {
        console.log(users),
        res.redirect('/profiles');
        // res.send(err);
    });
    // console.log(req.body)
});

// E is for EDIT
mainRouter.get('/profiles/:id/edit', (req, res) => {
    Profilesrebuild.findById(req.params.id, (err, users) =>{
        res.render('main/editprofile.ejs', {
            users,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
mainRouter.get('/profiles/:id', (req, res) => {
    Profilesrebuild.findById(req.params.id, (err, users) => {
        res.render('main/showprofile.ejs', {
            users, 
            tabTitle: 'Its you!',
        });
    }); 
});







// Export User Router
module.exports = mainRouter;
