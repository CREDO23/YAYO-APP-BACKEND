const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'thierrybakera12@gmail.com',
    pass: 'golcrnzduxjxkdqx',
  },
});

module.exports = transporter;
