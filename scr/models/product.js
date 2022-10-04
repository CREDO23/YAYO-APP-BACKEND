const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  brandName: {
    type: String,
    trim: true,
  },
  image: String,
  galery: [String],
});

module.exports = Product = mongoose.model("Product", productSchema);
