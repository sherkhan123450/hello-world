import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con'; // Ensure this file exports a function to connect with Mongoose
import Category from '@/models/CategoryModel'; // Ensure this file exports a Mongoose model

// GET /api/categories
export async function GET() {
    await dbConnect(); // Ensure the database connection is established

    try {
        const categories = await Category.find(); // Use .find() instead of .toArray() for Mongoose
        if (categories.length === 0) {
            return NextResponse.json({ message: 'No categories found' }, { status: 400 });
        }
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST /api/categories
export async function POST(req) {
    await dbConnect(); // Ensure the database connection is established

    const { name } = await req.json();

    if (!name || name.trim() === '') {
        return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save(); // Use .save() to create a new document
        return NextResponse.json({ message: 'Category created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
    }
}
