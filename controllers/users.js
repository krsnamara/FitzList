// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user')

// I is for INDEX

// N is for NEW
userRouter.get('/join', (req, res) => {
    res.render('users/join.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Join us now!'
    })
})
// D is for DELETE

// U is for UPDATE

// C is for CREATE

// E is for EDIT

// S is for SHOW


// Export User Router
module.exports = userRouter;



