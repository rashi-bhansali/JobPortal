const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var counterSchema = require('./counter');

let ApplicantSchema = new Schema({
    Applicant_Id: {type: Number, require:true},
    username: {type: String, required: true, max:100, unique:true},
    name: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    image : {type: String},
    email: {type: String, required:true},
    about: {type: String},
    phoneno: {type:String},
    dob: {type: Date, default: new Date()},
    gender: {type: String},
    qualification: {type: String},
    experience:{type: String},
    currentJob: {type: String},
    currentSalary: {type: String},
    currentCompany: {type: String},
    categories: [{type: String}],
    address: {
        city: {type: String},
        state: {type: String},
        country: {type: String},
        pincode: {type: String}
    },
    socialMedia: {
        facebook: {type: String},
        linkedin: {type: String},
        twitter: {type: String},
        github: {type: String}
    },
    resume: {
        education: 
        [{  etype: {type: String, enum: ['University', 'High School', 'School'], default:"", unique:true}, 
            yop: {type: Date, default: new Date()},
            percent: {type: Number, default:0.0},
            cgpa: {type: Number, default:0.0},
            ins: {type: String, default:""},
            major: {type: String, default:""},
        }],
        experience:
        [{   
            from: {type: Date, default: new Date()},
            to: {type: Date, default: new Date()},
            company: {type: String, default:""},
            role: {type: String, default:""},
            workDesc: {type: String, default:""},
        }],
        skills: [{type: String}],
        projects:
        [{   
            title: {type: String, default: ""},
            projDesc: {type: String, default: ""},
            projLink: {type: String, default: ""}
        }],
        achievements:
        [{   
            aTitle: {type: String, default: ""},
            year: {type: Date, default: new Date()},
            by: {type: String, default:""},
            aDesc: {type: String, default:""},
            aLink: {type: String, default: ""}
        }]
    },
    applied:[{type: ObjectId}]
});

const Counter = mongoose.model('Counter', counterSchema, "A_Counter");

ApplicantSchema.pre('save', function(next) {
    var curr = this;
    Counter.findOneAndUpdate({Id: "id"}, {$inc: { seq: 1}}, {new: true, upsert: true}).then(function(doc) {
		curr.Applicant_Id = doc.seq;
		next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

// Export the model
const Applicant = mongoose.model('Applicant', ApplicantSchema, 'Applicant');
module.exports = Applicant;
