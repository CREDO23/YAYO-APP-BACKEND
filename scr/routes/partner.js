const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner');

//get all partner
router.get('/', partnerController.getAllPartners);

//get partner
router.get('/get/:id', partnerController.getPartner);

//update partner
router.put('/update/:id', partnerController.updatePartner);

//create partner
router.post('/create', partnerController.createPartner);

//delete partner
router.delete('/delete/:id', partnerController.deletePartner);

module.exports = router;
