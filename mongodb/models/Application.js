const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

let ApplicationSchema = new Schema({
		JobID: {type: ObjectId, required: true},
		ApplicantID: {type: Number, required: true},
		DoA: {type: Date, default: new Date()},
		aStatus: {type: Number, default: 0}
	}
	);


// Export the model
const Application = mongoose.model('Application', ApplicationSchema, 'Application');
module.exports = Application;