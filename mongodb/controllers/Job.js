var Job = require('../models/Job');
var alert = require('alert');

exports.Job_create = function (req, res) {
    
    var job = new Job(
        {
            
        }
    );
    
    job.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect("http://localhost:3000/");
    })
};

exports.Job_details = function (req, res) {
    Job.findOne({_id: req.params.jid}).then((data) => {
        return res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};

exports.Job_update_app = function (req, res) {
    if(req.params.field=="add"){
        Job.findOneAndUpdate({_id: req.params.jid}, {$inc: {"currApplications": 1}}, {new: true}).then((data) => {
            if(data)
            {   
                if(data.maxApplications==data.currApplications){
                    Job.findOneAndUpdate({_id: req.params.jid}, {$set: {active: false}}, {new: true}).then((data1) =>{
                        if(data1){
                            return res;
                        }
                    })
                }
                return res;
            }
        });
    }
    else if(req.params.field=="del"){
        Job.findOneAndUpdate({_id: req.params.jid}, {$inc: {"currApplications": -1}}, {new: true}).then((data) => {
            if(data)
            {   
                if(data.maxApplications>data.currApplications){
                    Job.findOneAndUpdate({_id: req.params.jid}, {$set: {active: true}}, {new: true}).then((data1) =>{
                        if(data1){
                            return res;
                        }
                    })
                }
                return res;
            }
        });
    }
    
};

exports.Job_delete = function (req, res) {
   	Job.findOneAndDelete({_id: req.params.jid}, function (err) {
        if (err) console.log(err);
        res.redirect("http://localhost:3000/dummy");
    })
};

exports.Job_details_all = function (req, res) {
    
    Job.find({$and: [{active: true}, {deadline: {"$gte": new Date().toISOString()}}]}).then((data) => {
        if(data){
            //console.log(data);
        return res.json(data);
        }
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};