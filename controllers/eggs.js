// Dependencies
const express = require('express');
const eggsRouter = express.Router();

// Pizza Route

eggsRouter.get('/pizza', (req, res) => {
    res.render('eggs/pizza.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'I want Pizza!',
        });
    });

// Forgotten Password Route

eggsRouter.get('/forgotten', (req, res) => {
    res.render('eggs/forgotten.ejs', {
        currentUser: req.session.currentUser,
        tabTitle: 'Rick Roll',
        });
    });

// Under Construction Route

    eggsRouter.get('/underconstruction', (req, res) => {
        res.render('eggs/underconstruction.ejs', {
            currentUser: req.session.currentUser,
            tabTitle: 'Men At Work',
            });
        });
    
// Login Request Route
    eggsRouter.get('/loginplease', (req, res) => {
        res.render('eggs/loginplease.ejs', {
            currentUser: req.session.currentUser,
            tabTitle: 'Register or Login Please',
        });
    });
// Future Enhancements on Me Nav Button
    eggsRouter.get('/myprofile', (req, res) => {
        res.render('eggs/myprofile.ejs', {
            currentUser: req.session.currentUser,
            tabTitle: 'Its Me',
        });
    });

    // Export User Router
module.exports = eggsRouter;
