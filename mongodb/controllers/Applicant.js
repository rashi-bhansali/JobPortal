var Applicant = require('../models/Applicant');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.Applicant_create = function (req, res) {
    Applicant.findOne({ username: req.body.username }).then(applicant => {
        if (applicant) {
          return res.status(400).json({ name: "Username already exists" });
        }
        else
        {
          const newUser = new Applicant({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneno: req.body.phoneno,
            gender: "",
            dob: new Date(),
            qualification: "",
            experience: "",
            currentJob: "",
            currentSalary: "",
            currentCompany: "",
            about: "",
            image: "https://cdn2.vectorstock.com/i/thumb-large/23/81/default-avatar-profile-icon-vector-18942381.jpg",
            address:{
                city: "",
                country: "",
                pincode: "",
                state: ""
            },
            resume:{
                education: [],
                experience: [],
                skills: [],
                projects: [],
                achievements: []
            },
            applied: [],
            categories: [],
            socialMedia: {
                facebook: "",
                linkedin: "",
                twitter: "",
                github: ""
            }
          });
          //Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(applicant => res.json(applicant))
                .catch(err => console.log(err));
            });
          });
        }
      });
};

exports.Applicant_login = function (req, res) {
  
    const password = req.body.password;

    Applicant.findOne({username: req.body.username}).then(applicant => {
        // Check if user exists
        if (!applicant) {
          return res.status(400).json({ nameNotFound: "Username not found" });
        }

        bcrypt.compare(password, applicant.password).then(isMatch => {
            if (isMatch) {
            // User matched
            // Create JWT Payload
                const payload = {
                    aid: applicant.Applicant_Id,
                    username: applicant.username,
                    name: applicant.name,
                    email: applicant.email,
                    phoneno: applicant.phoneno,
                    currentJob: applicant.currentJob,
                    currentCompany: applicant.currentCompany,
                    City: applicant.address.city,
                    Country: applicant.address.country,
                    image: applicant.image
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 604800 // 1 month in seconds
                    },
                    (err, token) => {
                        res
                        .status(200)
                        .json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                );
                //res.redirect("http://localhost:3000/Dashboard");
            }
            else 
            {
                    return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
                //res.redirect("http://localhost:3000/");
        });
    });
};


exports.Applicant_details = function (req, res) {
    Applicant.findOne({Applicant_Id: req.params.aid}).then((data) => {
        //console.log('Data: ', data);
        return res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
};



exports.Applicant_delete = function (req, res) {
    if(req.params.field=="edu"){
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull: {"resume.education": {etype: req.body.etype}}}).then((applicant) => {
            res.redirect("http://localhost:3000/buildResume");
        })
        .catch((error) => {
            console.log('Applicant Education Details Not Deleted! ', error);
        });
    }
    else if(req.params.field=="exp"){
            var selector = {};
            var operator = {};
            selector["resume.experience."+req.body.expid] = {company:"delete"}; 
            operator['$set'] = selector;
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                    Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull:{"resume.experience": {company: "delete"}}}).then((applicant) => {
                        res.redirect("http://localhost:3000/buildResume#experience");
                    })
                    .catch((error) => {
                        console.log('Work Experience Not Deleted! ', error);
                    });
                })
                .catch((error) => {
                    console.log('Applicant Not found! ', error);
                });
    }
    else if(req.params.field=="proj"){
        var selector = {};
        var operator = {};
        selector["resume.projects."+req.body.pid] = {title:"delete"}; 
        operator['$set'] = selector;
            Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull:{"resume.projects": {title: "delete"}}}).then((applicant) => {
                    res.redirect("http://localhost:3000/buildResume#projects");
                })
                .catch((error) => {
                    console.log('Project Not Deleted! ', error);
                });
            })
            .catch((error) => {
                console.log('Applicant Not found! ', error);
            });
    }
    else if(req.params.field=="ach"){
        var selector = {};
        var operator = {};
        selector["resume.achievements."+req.body.achid] = {aTitle:"delete"}; 
        operator['$set'] = selector;
            Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull:{"resume.achievements": {aTitle: "delete"}}}).then((applicant) => {
                    res.redirect("http://localhost:3000/buildRresume#projects");
                })
                .catch((error) => {
                    console.log('Achievement Not Deleted! ', error);
                });
            })
            .catch((error) => {
                console.log('Applicant Not found! ', error);
            });
    }
    else if(req.params.field=="skill"){
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull:{"resume.skills": req.body.skill}}).then((applicant) => {
                    res.redirect("http://localhost:3000/buildResume#projects");
                })
                .catch((error) => {
                    console.log('Skill Not Deleted! ', error);
                });
    }
    else if(req.params.field=="apply"){
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$pull:{"applied": req.body.appid}}).then((applicant) => {
            return res;
        })
        .catch((error) => {
            console.log('Application IDs not deleted ', error);
        });
    }
};

exports.Applicant_update = function (req, res) {
    if(req.params.field=="personal"){
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, req.body, {$new: true}).then((applicant) => {
            if(applicant){
                res.redirect("http://localhost:3000/profile#personal");
            } //update
        })
        .catch((error) => {
            console.log('Applicant Not found! ', error);
        });
    }
    if(req.params.field=="categories")
    {
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$set: {"categories": req.body.categories}}, {$new: true}).then((applicant) =>{
                if(applicant)
                {
                    return res.json(applicant);
                }
            })
            .catch((error) => {
                console.log('Applicant Not found! ', error);
            });
    }
    if(req.params.field=="contact1")
    {
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$set: {"address": req.body}}, {$new: true}).then((applicant) => {
            if(applicant){
                res.redirect("http://localhost:3000/profile#contact");
            }
        })
        .catch((error) => {
            console.log('Applicant Not found! ', error);
        });  
    }
    if(req.params.field=="contact2")
    {
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid},  req.body, {$new: true}).then((applicant) => {
            if(applicant){
                res.redirect("http://localhost:3000/profile#contact");
            }
        })
        .catch((error) => {
            console.log('Applicant Not found! ', error);
        });  
    }
    if(req.params.field=="social")
    {
        Applicant.findOneAndUpdate({Applicant_Id: req.params.aid},  {$set: {"socialMedia": req.body}}, {$new: true}).then((applicant) => {
            if(applicant){
                res.redirect("http://localhost:3000/profile#social");
            }
        })
        .catch((error) => {
            console.log('Applicant Not found! ', error);
        });  
    }
    if(req.params.field=="edu"){
            Applicant.findOneAndUpdate({$and: [{Applicant_Id: req.params.aid}, {"resume.education.etype": req.body.etype}]}, {$set: {"resume.education.$": req.body}}, {$new: true}).then((applicant) => {
                //check if edu details exist based on etype -> if exists -> update else push
                if(applicant){
                    res.redirect("http://localhost:3000/buildResume#res");
                } //update
                else{
                    Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push: {"resume.education": req.body}}, function (err, data) {
                        if (err) console.log(err);
                        res.redirect("http://localhost:3000/buildResume#res");
                    });
                } //push
            })
            .catch((error) => {
                console.log('Applicant Not found! ', error);
            });        
    }

    else if(req.params.field=="exp"){
        var selector = {};
        var operator = {};
        
            if(req.body.expid == -1) //push
            {
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push: {"resume.experience": req.body}}, function (err, data) {
                    if (err) console.log(err);
                    res.redirect("http://localhost:3000/buildResume#experience");
                });
            }
            else{ //update
                
                selector["resume.experience."+req.body.expid] = req.body;
                operator['$set'] = selector;
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                    //check if edu details exist based on etype -> if exists -> update else push
                res.redirect("http://localhost:3000/buildResume#experience");
                })
                .catch((error) => {
                    console.log('Applicant Not found! ', error);
                });
            }
        }   
        else if(req.params.field=="proj"){
            var selector = {};
            var operator = {};
            if(req.body.pid == -1) //push
            {
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push: {"resume.projects": req.body}}, function (err, data) {
                    if (err) console.log(err);
                    res.redirect("http://localhost:3000/buildResume#projects");
                });
            }
            else{ //update
                
                selector["resume.projects."+req.body.pid] = req.body;
                operator['$set'] = selector;
                Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                    //check if edu details exist based on etype -> if exists -> update else push
                res.redirect("http://localhost:3000/buildResume#projects");
                })
                .catch((error) => {
                    console.log('Applicant Not found! ', error);
                });
            }
        }
        else if(req.params.field=="ach"){
            var selector = {};
            var operator = {};
                if(req.body.achid == -1) //push
                {
                    Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push: {"resume.achievements": req.body}}, function (err, data) {
                        if (err) console.log(err);
                        res.redirect("http://localhost:3000/buildResume#achievements");
                    });
                }
                else{ //update
                    
                    selector["resume.achievements."+req.body.achid] = req.body;
                    operator['$set'] = selector;
                    Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, operator, {$new: true}).then((applicant) => {
                        //check if edu details exist based on etype -> if exists -> update else push
                    res.redirect("http://localhost:3000/buildResume#achievements");
                    })
                    .catch((error) => {
                        console.log('Applicant Not found! ', error);
                    });
                }
            }
        else if(req.params.field=="skill"){
            Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push: {"resume.skills": {$each: req.body.skills}}}).then((data) =>{
                res.redirect("http://localhost:3000/buildResume#skills");
            })
            .catch((error) => {
                console.log('Applicant Not found! ', error);
            });
        }

        else if(req.params.field=="apply"){
            Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$push:{"applied": req.body.appid}}).then((applicant) => {
                return res;
            })
            .catch((error) => {
                console.log('Application IDs not updated ', error);
            });
        }
        
};

exports.Applicant_updatephoto = function (req, res) {
    var url = req.protocol + '://' + req.get('host')
    var path = req.file.path.replace(/\\/i, "/")
    var name= url + "/" + path
    //console.log(name);
    Applicant.findOneAndUpdate({Applicant_Id: req.params.aid}, {$set: {'image': name}}, {$new: true}).then((data) =>{
        if(data)
        {
            //console.log(data);
            //res.redirect("http://localhost:3000/profile");
        }
    })
    .catch((error) => {
        console.log('Applicant Not found! ', error);
    });

};
