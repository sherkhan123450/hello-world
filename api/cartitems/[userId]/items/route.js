import dbConnect from '@/lib/db_con';
import Cart from '@/models/CartModel';
import { NextResponse } from 'next/server';

// Add item to cart (POST)
export const POST = async (request, { params }) => {
    const { userId } = params;
    const item = await request.json();

    const {
        image,
        name,
        description,
        category,
        likes,
        net_price,
        quantity = 1 // Default quantity is 1 if not provided
    } = item;

    if (!userId || !image || !name || !description || !category || likes === undefined || !net_price) {
        console.log('Validation Error:', { userId, image, name, description, category, likes, net_price, quantity });
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        await dbConnect();

        let userCart = await Cart.findOne({ userId });

        if (userCart) {
            // Check if the item already exists in the cart
            const itemIndex = userCart.items.findIndex(
                (cartItem) => cartItem.name === name && cartItem.category === category
            );

            if (itemIndex > -1) {
                // If the item exists, update its quantity
                userCart.items[itemIndex].quantity += quantity;
                await userCart.save();
                console.log('Cart item quantity updated', userCart);
            } else {
                // If the item doesn't exist, add it to the cart
                userCart.items.push(item);
                await userCart.save();
                console.log('New item added to cart', userCart);
            }
        } else {
            // If no cart exists for the user, create a new one
            userCart = new Cart({
                userId,
                items: [item],
            });
            await userCart.save();
            console.log('New cart created with item', userCart);
        }

        return NextResponse.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
    }
};
