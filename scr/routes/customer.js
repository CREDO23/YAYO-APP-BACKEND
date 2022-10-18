const express = require('express');
const router = express.Router();
const customerControler = require('../controllers/customer');

//get all user
router.get('/', customerControler.getAllUsers);

//get user
router.get('/get/:id', customerControler.getUser);

//update user
router.put('/update/:id', customerControler.updateUser);

//create user
router.post('/create', customerControler.createUser);

//delete user
router.delete('/delete/:id', customerControler.deleteUser);

module.exports = router;
