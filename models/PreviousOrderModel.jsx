import mongoose from 'mongoose';

const PreviousItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    net_price: { type: Number, required: true }, // Price per item
}, { _id: false });

const PreviousOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    order: {
        totalPrice: { type: Number, required: true },
        items: [PreviousItemSchema], // Array of items in the previous order
        createdAt: { type: Date, required: true }, // Creation date of the order
    },
}, { timestamps: true });

const PreviousOrder = mongoose.models.PreviousOrder || mongoose.model('PreviousOrder', PreviousOrderSchema);

export default PreviousOrder;
