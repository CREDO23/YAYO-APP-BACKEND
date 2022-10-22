const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const { adminAuth, superAdminAuth } = require('../middleware/authentification');

//get all admins
router.get('/', adminAuth, adminController.getAllAdmins);

//get admin
router.get('/get/:id', adminAuth, adminController.getAdmin);

//update admin
router.put('/update/:id', adminAuth, adminController.updateAdmin);

//create admin
router.post('/create', superAdminAuth, adminController.createAdmin);

//delete admin
router.delete('/delete/:id', superAdminAuth, adminController.deleteAdmin);

module.exports = router;
