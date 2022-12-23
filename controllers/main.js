// Dependencies
const express = require('express');
const router = express.Router();
const Main = require('../models/seed');

// I is for INDEX
router.get('/', (req, res) => {
    Main.find({}, (err, foundMain) => {
        res.render('')
    })
})
// N is for NEW

// D is for DELETE

// U is for UPDATE

// C is for CREATE

// E is for EDIT

// S is for SHOW

module.exports = router;