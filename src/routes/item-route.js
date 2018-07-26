var express = require('express');
var router = express.Router();

const controller = require('../controllers/item-controller')
const authService = require('../services/auth-service');

/* GET products listing. */
router.get('/:key', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.set);
router.delete('/:key', authService.authorize, controller.remove);

module.exports = router;
