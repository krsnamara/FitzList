// Dependencies
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

// I is for INDEX
userRouter.get('/pizza', (req, res) => {
    res.render('/pizza.ejs', {
        tabTitle: 'I want Pizza',
        });
    });
// N is for NEW
userRouter.get('/newuser', (req, res) => {
    res.render('newuser.ejs', {
        tabTitle: 'Join us now!'
    });
});
// D is for DELETE

// U is for UPDATE

// C is for CREATE
// userRouter.post('/', (req, res) => {
//     // overwrite the user password with the hased password, then pass that in to our database
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//         // console.log()
//     User.create(req.body, (error, createdUser) => {
//         // console.log(User); kiko's test
//         res.redirect('/');
//     });
// });
// E is for EDIT

// S is for SHOW


// Export User Router
module.exports = userRouter;