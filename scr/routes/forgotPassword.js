const router = require('express').Router();
const passwordController = require('../controllers/forgotPassword');
const { forgotPassMiddle } = require('../middleware/authentification');

router.post('/forgot', passwordController.forgotPassword);

router.patch('/reset', forgotPassMiddle, passwordController.updatePassword);

module.exports = router;
