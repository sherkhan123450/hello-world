import dbConnect from '@/lib/db_con';
import FoodItem from '@/models/FoodItemsModel';
import { NextResponse } from 'next/server';

// Function to handle GET requests for fetching items by names
export const GET = async (req) => {
    try {
        await dbConnect();

        // Extract names from the request query
        const { searchParams } = new URL(req.url);
        const names = searchParams.get('names');

        if (!names) {
            return NextResponse.json({ error: 'Missing required field: names' }, { status: 400 });
        }

        // Split the names string into an array and ensure it's not empty
        const namesArray = names.split(',').map(name => name.trim()).filter(Boolean);

        if (namesArray.length === 0) {
            return NextResponse.json({ error: 'Invalid names provided' }, { status: 400 });
        }

        // Fetch items based on names
        const items = await FoodItem.find({ name: { $in: namesArray } });

        // Check if items were found
        if (!items || items.length === 0) {
            return NextResponse.json({ message: 'No items found' }, { status: 404 });
        }

        // Return the found items
        return NextResponse.json({ success: true, items });

    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
};
