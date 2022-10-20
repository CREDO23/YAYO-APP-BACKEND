const transporter = require('./transporter');
require('dotenv').config({ path: '../../../.env' });

const sendMail = (to, subject, html) => {
  const options = {
    from: 'thierrybakera12@gmail.com',
    to,
    subject,
    text: 'YAYO',
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendMail;
