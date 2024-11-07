import dbConnect from "@/lib/db_con";
import Order from "@/models/OrderModel";
import { NextResponse } from "next/server";

// Function to handle GET requests for fetching orders
export const GET = async (req, { params }) => {
  const { userId } = await params; // Get userId from request parameters

  try {
    await dbConnect();

    let userOrders = await Order.findOne({ userId });
    if (!userOrders) {
      return NextResponse.json({ success: false, message: "No orders found" });
    }

    // Find the first uncanceled order
    const uncanceledOrder = userOrders.orders.filter((order) => order.isCanceled === false);

    if (!uncanceledOrder) {
      return NextResponse.json({ success: false, message: "No uncanceled orders found" });
    }

    return NextResponse.json({ success: true, orders: uncanceledOrder });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" });
  }
};

// Function to handle DELETE requests for canceling all orders of a user
export const DELETE = async (req, { params }) => {
  const { userId } = await params; // Get userId from request parameters

  try {
    await dbConnect();

    // Delete all orders for the specified user
    const deletedOrders = await Order.findOneAndDelete({ userId });

    if (!deletedOrders) {
      return NextResponse.json({
        success: false,
        message: "No orders found for deletion",
      });
    }

    return NextResponse.json({
      success: true,
      message: "All orders canceled successfully",
    });
  } catch (error) {
    console.error("Error canceling orders:", error);
    return NextResponse.json({ error: "Failed to cancel orders" });
  }
};
