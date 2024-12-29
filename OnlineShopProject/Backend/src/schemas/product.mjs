import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    attributes: [
      {
        name: String,
        value: String
      }
    ],
    images: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false }
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
const Product = mongoose.model('Product', productSchema);

export default Product;
  