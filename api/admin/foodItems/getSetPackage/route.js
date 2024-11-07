import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con';
import Package from '@/models/PackageModel';

// CREATE a new package
export async function POST(req) {
    const { items, totalPrice, description, image , name } = await req.json();

    console.log("Received data:", { items, totalPrice, description, image , name });

    if (!items || !totalPrice || !description || !image || !name) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        await dbConnect();
        const newPackage = new Package({ items, totalPrice, description, image , name });
        await newPackage.save();

        return NextResponse.json({ message: 'Package created successfully', package: newPackage }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create package', error: error.message }, { status: 500 });
    }
}

// FETCH all packages
export async function GET() {
    try {
        await dbConnect();
        const packages = await Package.find({});
        return NextResponse.json(packages, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch packages', error: error.message }, { status: 500 });
    }
}
