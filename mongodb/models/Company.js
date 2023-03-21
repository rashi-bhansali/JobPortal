const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var counterSchema = require('./counter');

let CompanySchema = new Schema({
    Company_Id: {type: Number, require:true},
    Company_Name : {type: String, require:true},
	Domain : {type: String, require:true},
	About_Us : {type: String},
	Location : {type: String},
	Contact : {type: String, require:true},
	Email_Id : {type: String},
    logo: {type: String}
});

const Counter = mongoose.model('Counter', counterSchema, "C_Counter");

CompanySchema.pre('save', function(next) {
    var curr = this;
    Counter.findOneAndUpdate({Id: "id"}, {$inc: { seq: 1}}, {new: true, upsert: true}).then(function(doc) {
		curr.Company_Id = doc.seq;
		next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

// Export the model
const Company = mongoose.model('Company', CompanySchema, 'Company');
module.exports = Company;