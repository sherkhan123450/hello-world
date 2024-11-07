// pages/api/cartitems/getCartItems/[userId].js
import dbConnect from '@/lib/db_con';
import Cart from '@/models/CartModel';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
    const { userId } = params;

    try {
        await dbConnect();
        const userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return NextResponse.json({ error: 'Cart nottt found' }, { status: 404 });
        }

        return NextResponse.json(userCart);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
    }
};