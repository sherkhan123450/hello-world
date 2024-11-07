import dbConnect from '@/lib/db_con';
import Order from '@/models/OrderModel';
import { NextResponse } from 'next/server';
import PreviousOrder from '@/models/PreviousOrderModel';
////////////////////////////////////////////////////////////////////



// PUT: Update order status or mark as canceled////////////////////////////////
export const PUT = async (req, { params }) => {
    const { userId, orderId } = await params;

    let parsedBody;
    try {
        parsedBody = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }

    const { newStatus, isCanceled } = parsedBody || {};

    try {
        await dbConnect();

        if (!userId || !orderId || (!newStatus && isCanceled === undefined)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updateFields = isCanceled ? { 'orders.$.isCanceled': true } : { 'orders.$.status': newStatus };
        const updatedOrder = await Order.findOneAndUpdate(
            { userId, 'orders._id': orderId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
};

// POST: Move order to PreviousOrders collection and delete from active orders/////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
export const POST = async (req, { params }) => {
    const { userId, orderId } = await params;

    try {
        await dbConnect();

        if (!userId || !orderId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const userOrders = await Order.findOne({ userId });
        if (!userOrders) {
            return NextResponse.json({ error: 'User not found 1' }, { status: 404 });
        }

        const orderToDelete = userOrders.orders.find(order => order._id.toString() === orderId);
        if (!orderToDelete) {
            console.log('userOrder not found 2')
            return NextResponse.json({ error: 'Order not found 2' }, { status: 404 });
        }

        // Prepare order items for PreviousOrder
        const items = orderToDelete.items.map(item => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            net_price: item.net_price,
            category: item.category,
            image: item.image,
        }));

        const previousOrder = new PreviousOrder({
            userId,
            firstName: userOrders.profile.firstName,
            lastName: userOrders.profile.lastName,
            email: userOrders.profile.email,
            phoneNumber: userOrders.profile.phoneNumber,
            address: userOrders.profile.address,
            order: {
                totalPrice: orderToDelete.totalPrice,
                items,
                createdAt: orderToDelete.createdAt
            }
        });

        await previousOrder.save();

        const res = await Order.updateOne(
            { userId, 'orders._id': orderId },
            { $pull: { orders: { _id: orderId } } }
        );
        return NextResponse.json({ message: 'Order moved to previous orders and deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error occurred while processing order:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
///////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////

export const DELETE = async (req, { params }) => {
    const { userId, orderId } = await params;

    try {
        await dbConnect();

        if (!userId || !orderId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const userOrders = await Order.findOne({ userId });
        if (!userOrders) {
            console.log("User not found");
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const orderExists = userOrders.orders.some(order => order._id.toString() === orderId);
        if (!orderExists) {
            console.log("Order not found");
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        await Order.updateOne(
            { userId },
            { $pull: { orders: { _id: orderId } } }
        );


        return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};