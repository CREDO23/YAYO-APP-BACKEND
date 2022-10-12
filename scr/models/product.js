const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema({
  brandName: {
    type: String,
    trim: true,
    required: [true, 'The brandName is required'],
  },
  image: {
    type: String,
    required: [true, 'The image is required'],
  },
  galery: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
