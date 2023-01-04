// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const session = require('express-session');
const checkAuth = require('../middleware/checkauth.js')

// I is for INDEXs

sessionsRouter.get('/profile', (req, res) => {
    User.find({}, (err, users) => {
        res.render('/profile.ejs', { users });
    });
});

// N is for NEW

sessionsRouter.get('/jobs', checkAuth, (req, res) => {
	// step 1) find all available authors from the author collection
	// step 2) provide those authors as a context to the new.ejs template
	User.find({}, (err, user) => {
		res.render('sessions/jobscreate.ejs', { user });
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

