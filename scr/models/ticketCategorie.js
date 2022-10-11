const { Schema, default: mongoose } = require("mongoose");

const ticketCategorieSchema = new Schema({
  brandName: {
    type: String,
    trim: true,
    required: [true, "The brandName is required"],
  },
  value: {
    type: String,
    trim: true,
    required: [true, "The value is required"],
  },
});

module.exports = TicketCategorie = mongoose.model(
  "TicketCategorie",
  ticketCategorieSchema
);
