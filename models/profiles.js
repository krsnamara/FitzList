// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining New Schema Name and Key Value Pairs
const profileSchema = Schema(
    {
        profileimg: { type: String },
        name: { type: String},
        about: {type: String},
        skills: { type: String},
    },  
    {   timestamps: true }
);

// User Model
const Profiles = mongoose.model('Profiles', profileSchema);

// Export User Model
module.exports = Profiles;