// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const profilesSchema = Schema({
    profileimg: { type: String },
    name: { type: String },
    about: {type: String},
    skills: { type: String},
    projects: [{
        img1: "String",
        img2: "String",
        img3: "String",
        img4: "String",
    }],
    }, { timestamps: true });

// User Model
const Profiles = mongoose.model('Profiles', profilesSchema);

// Export User Model
module.exports = Profiles;