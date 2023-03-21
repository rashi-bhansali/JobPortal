var express = require('express');
var router = express.Router();

var Company_controller = require('../controllers/Company');

router.post('/create', Company_controller.Company_create);

router.get('/:cid', Company_controller.Company_details);

router.put('/:cid/update', Company_controller.Company_update);

router.delete('/:cid/delete', Company_controller.Company_delete);


module.exports = router;