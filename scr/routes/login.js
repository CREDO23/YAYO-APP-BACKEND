const router = require('express').Router();
const logiController = require('../controllers/login');

router.post('/', logiController.login);

module.exports = router;
