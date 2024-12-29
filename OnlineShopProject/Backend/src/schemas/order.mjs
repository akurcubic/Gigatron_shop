import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    products: [
      {
        product: {
          _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          name: { type: String, required: true },
          description: { type: String },
          price: { type: String, required: true },
          brandId: { type: mongoose.Schema.Types.ObjectId, required: true },
          categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
          attributes: [
            {
              name: { type: String, required: true },
              value: { type: String, required: true }
            }
          ],
          images: [
            {
              url: { type: String, required: true },
              isPrimary: { type: Boolean, required: true }
            }
          ]
        },
        quantity: { type: Number, required: true }
      }
    ],
    price: { type: Number, required: true },
    deliveryMethod: { type: String, required: true },
    deliveryAddress: [
        {
          name: String,
          value: String
        }
      ],
    paymentMethod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
