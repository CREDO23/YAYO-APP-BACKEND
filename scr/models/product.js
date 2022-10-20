const { Schema, default: mongoose } = require('mongoose');

const productSchema = new Schema(
  {
    brandName: {
      type: String,
      trim: true,
      required: [true, 'The brandName is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'The image is required'],
    },
    galery: [String],
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
