// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const session = require('express-session');

// I is for INDEXs
sessionsRouter.get('/', (req, res) => {
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

// Forgotten Password Route

sessionsRouter.get('/forgotten', (req, res) => {
res.render('./forgotten.ejs', {
    tabTitle: 'Rick Roll',
    });
});

// Pizza Route

sessionsRouter.get('/pizza', (req, res) => {
    res.render('/pizza.ejs', {
        tabTitle: 'I want Pizza',
        });
    });

sessionsRouter.get('/profile', (req, res) => {
    User.find({}, (err, users) => {
        res.render('/profile.ejs', { users });
    });
});

// N is for NEW

// D is for DELETE
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

// U is for UPDATE

// C is for CREATE
// working login route
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        if (!foundUser) {
            res.send(`Opps! No user with that email address has been registered.`);
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

            if (passwordMatches) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.send('Oops! Invalid credentials.');
            }
        }
    });
});

// E is for EDIT

// S is for SHOW

sessionsRouter.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .populate('user')
    .exec((err, foundUser) => {
        res.render('/sessions/profile.ejs', {
            user: foundUser
        });
    });
});

// Export Sessions Router
module.exports = sessionsRouter;

