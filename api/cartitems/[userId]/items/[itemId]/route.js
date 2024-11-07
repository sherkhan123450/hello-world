import dbConnect from "@/lib/db_con";
import Cart from "@/models/CartModel";
import { NextResponse } from "next/server";

// Update item quantity in cart (PUT)
export const PUT = async (request, { params }) => {
    const { userId, itemId } = params;
    const { quantity } = await request.json();

    if (quantity < 1) {
        return NextResponse.json({ error: 'Quantity must be at least 1' }, { status: 400 });
    }

    try {
        await dbConnect();
        const userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        const item = userCart.items.id(itemId);

        if (!item) {
            return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
        }

        item.quantity = quantity;
        await userCart.save();

        return NextResponse.json({
            message: 'Item quantity updated successfully',
            updatedItem: item,
        });
    } catch (error) {
        console.error('Error updating item quantity:', error);
        return NextResponse.json({ error: 'Failed to update item quantity' }, { status: 500 });
    }
};

// Remove item from cart (DELETE)
export const DELETE = async (request, { params }) => {
    const { userId, itemId } = params;

    try {
        await dbConnect();
        const userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        // Remove the item using `pull()` to modify the array
        userCart.items.pull({ _id: itemId });
        await userCart.save();

        return NextResponse.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
    }
};
