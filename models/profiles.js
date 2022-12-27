// Dependencies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const profilesSchema = Schema({
    name: { type: String, unique: true, required: true },
    img:  { type: String},
    about: {type: String},
    skills: { type: String},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
    }, { timestamps: true });

// User Model
const Profiles = mongoose.model('Profiles', userSchema);

// Export User Model
module.exports = Profiles;