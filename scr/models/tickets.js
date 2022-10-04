const { Schema, default: mongoose } = require("mongoose");

const ticketSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: "TicketCategorie",
    },
    statut: {
      type: String,
      enum: ["Created", "Played", "Delivered"],
    },
    value: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    notified: Boolean,
  },
  { timestamps: true }
);

module.exports = Ticket = mongoose.model("Ticket", ticketSchema);
