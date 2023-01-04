// Dependencies
const express = require('express');
const eggsRouter = express.Router();

// Pizza Route

eggsRouter.get('/pizza', (req, res) => {
    res.render('/pizza.ejs', {
        tabTitle: 'I want Pizza!',
        });
    });

// Forgotten Password Route

eggsRouter.get('/forgotten', (req, res) => {
    res.render('/forgotten.ejs', {
        tabTitle: 'Rick Roll',
        });
    });

    // Export User Router
module.exports = eggsRouter;
