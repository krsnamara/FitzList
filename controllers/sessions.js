// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const session = require('express-session');
const checkAuth = require('../middleware/checkauth.js')


// D is for DELETE
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

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
                res.redirect('/profiles');
            } else {
                res.send('Oops! Invalid credentials.');
            }
        }
    });
});

// Export Sessions Router
module.exports = sessionsRouter;

