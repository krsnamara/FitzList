// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const session = require('express-session');

// I is for INDEX
sessionsRouter.get('/profile', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.render('/profile.ejs', {
            users: foundUser,
        });
    });
});

// N is for NEW
sessionsRouter.get('/wronglogin', (req, res) => {
    res.render('sessions/wronglogin.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Login',
    });
});

// D is for DELETE
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

// U is for UPDATE

// C is for CREATE

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
                res.redirect('/profile.ejs');
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
        res.render('/profile.ejs', {
            user: foundUser
        });
    });
});

// Export Sessions Router
module.exports = sessionsRouter;

