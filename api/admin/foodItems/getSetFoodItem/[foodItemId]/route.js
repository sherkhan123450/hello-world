// src/pages/api/admin/foodItems/[foodItemId].js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con';
import FoodItem from '@/models/FoodItemsModel';

// UPDATE an existing food item
export async function PUT(req, { params }) {
    const { foodItemId } = params;
    const id = foodItemId;
    const { isSpecialOffer, ifWeeklyOffer, discountPercentage , net_price , price , category ,description , name} = await req.json();

    if (!id || isSpecialOffer === undefined || ifWeeklyOffer === undefined || discountPercentage === undefined) {
        return NextResponse.json({ message: 'All required fields are missing' }, { status: 400 });
    }

    try {
        await dbConnect();
        const updatedFoodItem = await FoodItem.findByIdAndUpdate(id, {
            isSpecialOffer, ifWeeklyOffer, discountPercentage , net_price , price , category ,description , name
        }, { new: true });

        if (!updatedFoodItem) {
            return NextResponse.json({ message: 'Food item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Food item updated successfully', foodItem: updatedFoodItem }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update food item', error: error.message }, { status: 500 });
    }
}



// DELETE a food item
export async function DELETE(req , {params}) {
    const { foodItemId} = params;
    const id = foodItemId

    if (!id) {
        return NextResponse.json({ message: 'Food item ID is required' }, { status: 400 });
    }

    try {
        await dbConnect();
        await FoodItem.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Food item deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete food item', error: error.message }, { status: 500 });
    }
}

// GET a single food item by ID
export async function GET(req, { params }) {
    const { foodItemId } = params;
    const id = foodItemId;

    if (!id) {
        return NextResponse.json({ message: 'Food item ID is required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const foodItem = await FoodItem.findById(id);

        if (!foodItem) {
            return NextResponse.json({ message: 'Food item not found' }, { status: 404 });
        }

        return NextResponse.json({ foodItem }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to retrieve food item', error: error.message }, { status: 500 });
    }
}