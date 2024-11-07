import mongoose from 'mongoose';

const foodItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Base64 string for the image
    likes: { type: Number, default: 0 },
    isSpecialOffer: { type: Boolean, default: false },
    ifWeeklyOffer: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
    net_price: { type: Number, default : 0},
    quantity: { type: Number, default: 1 },
});

// Pre-save middleware to calculate net_price
foodItemsSchema.pre('save', function(next) {
    if (this.isModified('price') || this.isModified('discount')) {
        this.net_price = this.price - (this.price * this.discountPercentage / 100);
    }
    next();
});

const FoodItem = mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemsSchema);

export default FoodItem;
