// Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// DB config
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongodb not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middlewares
app.use(express.urlencoded({ extended: false }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Controllers
const mainController = require('./controllers/main');
app.use('/main', mainController);

// Routes

app.get('/', (req, res) => {
    res.render('index.ejs')
});

// Shallow route to the route for comment delete function
// app.use('/', articlesController)

// Listening 
app.listen(3000, () =>{
    console.log('listening...')
});