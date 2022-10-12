const { Schema, default: mongoose } = require('mongoose');

const customerSchema = new Schema(
  {
    userName: {
      type: String,
      unique: [true, 'userName already exists'],
      required: [true, 'The userName must be filled out'],
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    sex: {
      type: String,
      trim: true,
    },
    ageInterval: {
      type: String,
      trim: true,
    },
    adress: {
      quartier: {
        type: String,
        trim: true,
      },
      ville: {
        type: String,
        trim: true,
      },
      avenue: {
        type: String,
        trim: true,
      },
    },
    email: {
      type: String,
      required: [true, 'The email must be filled out'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'The password must be filled out'],
      trim: true,
    },
    tickets: {
      winings: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
      },
      faillings: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket',
      },
    },
    notifications: {
      news: [{ type: Map, of: String }],
      read: [{ type: Map, of: String }],
    },
    notificationsId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
