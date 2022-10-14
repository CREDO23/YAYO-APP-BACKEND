const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket')

//get all tickets
router.get('/', ticketController.getAllTickets);

//get tickets
router.get('/get/:id', ticketController.getTicket);

//update tickets
router.put('/update/:id', ticketController.updateTicket);

//create tickets
router.post('/create', ticketController.createTicket);

//delete tickets
router.delete('/delete/:id', ticketController.deleteTicket);

module.exports = router;
