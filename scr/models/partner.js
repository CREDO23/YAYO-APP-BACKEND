const { Schema, default: mongoose } = require("mongoose");
const bycrpt = require("bcrypt");

const partnerSchema = new Schema(
  {
    userName: {
      type: String,
      unique: [true, "userName already exists"],
      required: [true, "The userName must be filled out"],
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
    shopAdress: {
      quartier: {
        type: String,
        trim: true,
        required: [true, "Complete your adress"],
      },
      ville: {
        type: String,
        trim: true,
        required: [true, "Complete your adress"],
      },
      avenue: {
        type: String,
        trim: true,
        required: [true, "Complete your adress"],
      },
    },
    email: {
      type: String,
      required: [true, "The email must be filled out"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "The password must be filled out"],
      trim: true,
    },
    tickets: {
      assigned: {
        type: [Schema.Types.ObjectId],
        ref: "Ticket",
      },
      delivered: {
        type: [Schema.Types.ObjectId],
        ref: "Ticket",
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
    shopBrandName: {
      type: String,
      trim: true,
      required: [true, "The ShopBrandName must be filled out"],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: [true, "The product must be filled out"],
    },
  },
  { timestamps: true }
);

module.exports = Partner = mongoose.model("Partner", partnerSchema);
