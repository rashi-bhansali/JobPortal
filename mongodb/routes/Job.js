var express = require('express');
var router = express.Router();

var Job_controller = require('../controllers/Job');

router.post('/create', Job_controller.Job_create);

router.get('/:jid', Job_controller.Job_details);

router.get('/', Job_controller.Job_details_all);

router.put('/:jid/updateApp/:field', Job_controller.Job_update_app);

router.delete('/:jid/delete', Job_controller.Job_delete);


module.exports = router;