import dbConnect from '@/lib/db_con';
import Order from '@/models/OrderModel';
import { NextResponse } from 'next/server';

// Function to handle POST requests for creating/updating an order
export const POST = async (request) => {
    try {
        await dbConnect();
        const body = await request.json();
        const { order, profile } = body;

        // Destructure necessary fields from order and profile
        const { userId, items, totalPrice } = order;
        const { firstName, lastName, email, phoneNumber, address, isVerified } = profile;


        // Check for missing fields
        if (!userId || !items || !totalPrice || !firstName || !lastName || !email || !phoneNumber || !address) {
            console.log('Missing required fields', userId, items, totalPrice, firstName, lastName, email, phoneNumber, address);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Find existing order document for the user
        let userOrder = await Order.findOne({ userId });

        // If no order exists, create a new one
        if (!userOrder) {
            const newOrder = new Order({
                userId,
                profile: { firstName, lastName, email, phoneNumber, address, isVerified },
                orders: [{
                    items,
                    totalPrice,
                    status: 'Pending' // Default status
                }]
            });

            await newOrder.save();
            return NextResponse.json({ success: true, order: newOrder });
        }

        // If the order exists, append the new items to the 'orders' array
        userOrder.orders.push({
            items,
            totalPrice,
            status: 'Pending' // Default status
        });

        await userOrder.save();
        return NextResponse.json({ success: true, order: userOrder });

    } catch (error) {
        console.error('Error creating or updating order:', error);
        return NextResponse.json({ error: 'Failed to create or update order' }, { status: 500 });
    }
};

// Function to handle GET requests for fetching all orders
export const GET = async (request) => {
    try {
        await dbConnect();
        
        // Fetch all orders from the database
        const allOrders = await Order.find({});

        // Check if orders exist
        if (!allOrders || allOrders.length === 0) {
            return NextResponse.json({ message: 'No orders found' }, { status: 404 });
        }

        // Return all orders
        return NextResponse.json({ success: true, orders: allOrders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
};
