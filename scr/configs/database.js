const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.URL_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connection to the database established");
  })
  .catch((err) => console.log(err));
