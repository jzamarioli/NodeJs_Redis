var express = require('express');
var router = express.Router();

const controller = require('../controllers/index-controller')

/* GET home page. */
router.get('/', controller.showHomePage);

module.exports = router;
