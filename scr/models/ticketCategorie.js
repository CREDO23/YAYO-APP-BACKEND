const { Schema, default: mongoose } = require("mongoose");

const ticketCategorieSchema = new Schema({
  brandName: {
    type: String,
    trim: true,
  },
  value: {
    type: String,
    trim: true,
  },
});

module.exports = TicketCategorie = mongoose.model(
  "TicketCategorie",
  ticketCategorieSchema
);
