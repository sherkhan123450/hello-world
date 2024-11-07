// models/CartModel.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {

            image: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            category: { type: String, required: true },
            likes: { type: Number, required: true },
            net_price: { type: Number, required: true },
            quantity: { type: Number, default: 1  },
        }
    ]
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
