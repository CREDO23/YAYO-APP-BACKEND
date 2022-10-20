const { Schema, default: mongoose } = require('mongoose');

const ticketCategorieSchema = new Schema(
  {
    brandName: {
      type: String,
      trim: true,
      required: [true, 'The brandName is required'],
    },
    value: {
      type: String,
      trim: true,
      required: [true, 'The value is required'],
    },
  },
  { timestamps: true },
);

const TicketCategorie = mongoose.model(
  'TicketCategorie',
  ticketCategorieSchema,
);

module.exports = TicketCategorie;
