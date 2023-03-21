var Application = require('../models/Application');
var alert = require('alert');


exports.Application_create = function (req, res) {
    
    var application = new Application(
        {
            JobID: req.body.jid,
            ApplicantID: req.body.aid,
            DoA: req.body.date,
            aStatus: 0
        }
    );
    
    application.save(function (err) {
        if (err) {
            console.log(err);
        }
        else{
            return res.json(application._id);
        }    
    })
};

exports.Application_details = function (req, res) {
    Application.findOne({'_id': req.params.appid}).then((data) => {
        //console.log(data)
        return res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};

exports.Application_update = function (req, res) {
    Application.findOneAndUpdate({_id: req.params.appid}, {$set: req.body}, function (err, application) {
        if (err) console.log(err);
        alert('Applicant details updated successfully');
        res.redirect("http://localhost:3000/dummy");
    });
};

exports.Application_delete = function (req, res) {
   	Application.findOneAndDelete({_id: req.params.appid}, function (err) {
        if (err) console.log(err);
        return res;
    })
};

exports.Application_details_individual = function (req, res) {
    Application.find({'ApplicantID': req.params.aid}).then((data) => {
            return res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};
