const { Schema, default: mongoose } = require('mongoose');

const ticketSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    categorie: {
      type: Schema.Types.ObjectId,
      ref: 'TicketCategorie',
      required: [true, 'The categorie is required'],
    },
    statut: {
      type: String,
      enum: ['Created', 'Played', 'Delivered'],
      default: 'Created',
    },
    value: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
