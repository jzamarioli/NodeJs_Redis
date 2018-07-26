var express = require('express');
var router = express.Router();

const controller = require('../controllers/user-controller')

/* GET products listing. */
router.post('/authenticate', controller.authenticate);

module.exports = router;
