const express = require("express");
const router = express.Router();
const ticketCategorieController = require("../controllers/categorieTicket");

//get all ticketCategories
router.get("/", ticketCategorieController.getAllTicketCategorie);

//get ticketCategorie
router.get("/get/:id", ticketCategorieController.getTicketCategorie);

//update ticketCategorie
router.put("/update/:id", ticketCategorieController.updateTicketCategorie);

//create ticketCategorie
router.post("/create", ticketCategorieController.createTicketCategorie);

//delete ticketCategorie
router.delete("/delete/:id", ticketCategorieController.deleteTicketCategorie);

module.exports = router;
