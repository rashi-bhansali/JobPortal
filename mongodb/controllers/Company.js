var Company = require('../models/Company');
var alert = require('alert');

exports.Company_create = function (req, res) {
    
    var company = new Company(
        {
            Company_Id: 0,
			Company_Name : req.body.Company_Name,
			Domain : req.body.Domain,
			About_Us : req.body.About,
			Location : req.body.Location,
			Contact : req.body.Contact,
			Email_Id : req.body.Email
        }
    );
    
    company.save(function (err) {
        if (err) {
            console.log(err);
        }
        alert('Company Created successfully');
        res.redirect("http://localhost:3000/");
    })
};

exports.Company_details = function (req, res) {
    Company.findOne({Company_Id: req.params.cid}).then((data) => {
        return res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};

exports.Company_update = function (req, res) {
    Company.findOneAndUpdate({Company_Id: req.params.Company_Id}, {$set: req.body}, function (err, company) {
        if (err) console.log(err);
        alert('Applicant details updated successfully');
        res.redirect("http://localhost:3000/dummy");
    });
};

exports.Company_delete = function (req, res) {
   	Company.findOneAndDelete({Company_Id: req.params.cid}, function (err) {
        if (err) console.log(err);
        alert('Applicant Deleted successfully');
        res.redirect("http://localhost:3000/dummy");
    })
};