const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobpostSchema = new Schema( {
	title: String,
	body: String,
	Jobpost: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	}
}, { timestamps: true});

const Jobpost = mongoose.model('Jobpost', articleSchema);

module.exports = Jobpost;