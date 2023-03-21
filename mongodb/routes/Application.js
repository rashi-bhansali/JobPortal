var express = require('express');
var router = express.Router();

var Application_controller = require('../controllers/Application');

router.post('/create', Application_controller.Application_create);

router.get('/:appid', Application_controller.Application_details);

router.get('/details/:aid', Application_controller.Application_details_individual);

router.put('/:appid/update', Application_controller.Application_update);

router.delete('/:appid/delete', Application_controller.Application_delete);


module.exports = router;