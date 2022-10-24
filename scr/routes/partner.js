const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner');
const { partnerAuth, adminAuth } = require('../middleware/authentification');

//get all partner
router.get('/', partnerAuth, partnerController.getAllPartners);

//get partner
router.get('/get/:id', partnerAuth, partnerController.getPartner);

//update partner
router.put('/update/:id', partnerAuth, partnerController.updatePartner);

//create partner
router.post('/create', adminAuth, partnerController.createPartner);

//delete partner
router.delete('/delete/:id', partnerAuth, partnerController.deletePartner);

module.exports = router;
