import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con';
import FoodItem from '@/models/FoodItemsModel';

// CREATE a new food item
export async function POST(req) {
    const { name, category, description, price, image } = await req.json();

    if (!name || !category || !description || !price || !image) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const newFoodItem = new FoodItem({ name, category, description, price, image });
        await newFoodItem.save();

        return NextResponse.json({ message: 'Food item created successfully', foodItem: newFoodItem }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create food item', error: error.message }, { status: 500 });
    }
}

// FETCH all food items
export async function GET() {
    try {
        await dbConnect();
        const foodItems = await FoodItem.find({});
        return NextResponse.json(foodItems, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch food items', error: error.message }, { status: 500 });
    }
}

