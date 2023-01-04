// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

// N is for NEW
userRouter.get('/join', (req, res) => {
    res.render('users/join.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Join us now!'
    });
});

// C is for CREATE
userRouter.post('/', (req, res) => {
    // overwrite the user password with the hased password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        // console.log()
    User.create(req.body, (error, createdUser) => {
        // console.log(User); kiko's test
        res.redirect('/');
    });
});

// Export User Router
module.exports = userRouter;



