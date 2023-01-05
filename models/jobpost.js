const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobpostSchema = new Schema( {
	profileimg: String,
	title: String,
	body: String,
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'Profiles',
	}
}, { timestamps: true});

const Jobpost = mongoose.model('Jobpost', jobpostSchema);

module.exports = Jobpost;