const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const multer = require('multer');
let path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/');
    },
    filename: function(req, file, cb) {   
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

//middle ware for uploading photo
let upload = multer({ storage, fileFilter });


var Applicant_controller = require('../controllers/Applicant');

router.post('/create', Applicant_controller.Applicant_create);

router.post('/login', Applicant_controller.Applicant_login);

router.get('/:aid', Applicant_controller.Applicant_details);

router.post('/:aid/updateimage', upload.single('image'), Applicant_controller.Applicant_updatephoto);

router.post('/:aid/update/:field', Applicant_controller.Applicant_update);

router.delete('/:aid/delete/:field', Applicant_controller.Applicant_delete);

module.exports = router;