import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming you have a User model, we use ObjectId to reference it
        required: true
    },
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

    },
    orders: [
        {
            items: [
                {
                    image: { type: String, required: true },
                    name: { type: String, required: true },
                    description: { type: String, required: true },
                    category: { type: String, required: true },
                    likes: { type: Number, required: true },
                    net_price: { type: Number, required: true },
                    quantity: { type: Number, default: 1 }
                }
            ],
            totalPrice: { type: Number, required: true },
            status: { type: String, default: 'Pending' },
            createdAt: { type: Date, default: Date.now },
            isCanceled: { type: Boolean, default: false }
        }
    ]
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
