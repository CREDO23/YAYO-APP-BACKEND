const express = require('express');
const router = express.Router();
const customerControler = require('../controllers/customer');
const { customersAuth } = require('../middleware/authentification');

//get all user
router.get('/', customerControler.getAllUsers);

//get user
router.get('/get/:id', customersAuth, customerControler.getUser);

//update user
router.put('/update/:id', customersAuth, customerControler.updateUser);

//create user
router.post('/create', customerControler.createUser);

//delete user
router.delete('/delete/:id', customersAuth, customerControler.deleteUser);

module.exports = router;
