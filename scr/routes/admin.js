const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

//get all admins
router.get('/', adminController.getAllAdmins);

//get admin
router.get('/get/:id', adminController.getAdmin);

//update admin
router.put('/update/:id', adminController.updateAdmin);

//create admin
router.post('/create', adminController.createAdmin);

//delete admin
router.delete('/delete/:id', adminController.deleteAdmin);

module.exports = router;
