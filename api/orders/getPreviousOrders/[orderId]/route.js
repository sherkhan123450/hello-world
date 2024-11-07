// src/app/api/orders/getPreviousOrders/[id].js

import dbConnect from '@/lib/db_con';
import { NextResponse } from 'next/server';
import PreviousOrder from '@/models/PreviousOrderModel';

// Handle DELETE requests to delete a specific order by ID
export const DELETE = async (request, { params }) => {
    const { orderId } = params;

    try {
        await dbConnect();

        // Find and delete the order by ID
        const deletedOrder = await PreviousOrder.findByIdAndDelete(orderId);

        // Check if the order was found and deleted
         
        return NextResponse.json({ success: true, orderId: id, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
};
