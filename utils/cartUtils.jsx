export const calculateTotal = (cartItems, deliveryFees) => {
    const netPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = netPrice + deliveryFees;
    return { netPrice, total };
};