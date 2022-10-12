const mongoose = require('mongoose');

module.exports = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-unused-vars
  .then((db) => {
    console.log('Connection to the database established');
  })
  .catch((err) => console.log(err));
