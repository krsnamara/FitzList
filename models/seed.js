const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainSchema = new Schema( {
    name: String,
    email: String,
    password: String,
    location: String,
},  {
    timestamps: true    
});

const Main = mongoose.model('Main', mainSchema);

module.exports = Main;