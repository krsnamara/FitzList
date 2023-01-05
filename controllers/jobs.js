// Dependencies
const express = require('express');
const jobsRouter = express.Router();
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const session = require('express-session');
const checkAuth = require('../middleware/checkauth.js')
const Jobs = require('../models/jobpost')
const User = require('../models/user.js');
const Profiles = require('../models/profiles.js');

// Routes

// Seed
const jobSeed = require('../models/jobSeed');
jobsRouter.get('/seed', (req, res) => {
    Jobs.deleteMany({}, (error, alljobs) => {});

    Jobs.create(jobSeed, (error, data) => {
        res.redirect('/');
    });
});

jobsRouter.get('/', (req, res) => {
    Jobs.find({}, (err, jobs)  => {
        res.render('jobs/jobsboard.ejs', {
            currentUser: req.session.currentUser,
            jobs,
            tabTitle: 'jobs Index',});
    });
});

// N is for NEW
jobsRouter.get('/newjob', checkAuth, (req, res) => {
    Profiles.find({}, (err, profiles) => {
		res.render('jobs/jobscreate.ejs', { 
            profiles,
            currentUser: req.session.currentUser,
            tabTitle: 'Join us now!',
        });
    });
});

// D is for DELETE
jobsRouter.delete('/:id', (req, res) => {
    Jobs.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/jobs');
    });
});

// U is for UPDATE
jobsRouter.put('/:id', (req, res) => {
    Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, job) =>{
        res.redirect('/jobs');
    });
});

// C is for CREATE
jobsRouter.post('/newjob', (req, res) => {
    Jobs.create(req.body, (err, job) => {
        res.redirect('/jobs');
    });
});

// E is for EDIT
jobsRouter.get('/:id/edit', (req, res) => {
    Jobs.findById(req.params.id, (err, job) =>{
        res.render('jobs/editjobs.ejs', {
            currentUser: req.session.currentUser,
            job,
            tabTitle: 'Lets edit',
        });
    });
});

// S is for SHOW
jobsRouter.get('/:id', (req, res) => {
    Jobs.findById(req.params.id, (err, job) => {
        res.render('jobs/showjobs.ejs', {
            currentUser: req.session.currentUser,
            job, 
            tabTitle: 'Its you!',
        });
    }); 
});

// Export User Router
module.exports = jobsRouter;