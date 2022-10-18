const { Schema, default: mongoose } = require('mongoose');

const adminSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['superAdmin', 'admin'],
      default: 'admin',
    },
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
