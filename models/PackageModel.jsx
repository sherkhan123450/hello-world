import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
