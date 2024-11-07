import dbConnect from '@/lib/db_con';
import { NextResponse } from 'next/server';
import PreviousOrder from '@/models/PreviousOrderModel';

// Handle GET requests to fetch all previous orders
export const GET = async (request) => {
    try {
        await dbConnect();

        // Fetch all orders from the database
        const allOrders = await PreviousOrder.find({});

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

// Handle DELETE requests to delete all previous orders
export const DELETE = async (request) => {
    try {
        await dbConnect();

        // Delete all previous orders from the database
        await PreviousOrder.deleteMany({});

        // Return a success response
        return NextResponse.json({ success: true, message: 'All previous orders deleted successfully' });
    } catch (error) {
        console.error('Error deleting orders:', error);
        return NextResponse.json({ error: 'Failed to delete orders' }, { status: 500 });
    }
};
