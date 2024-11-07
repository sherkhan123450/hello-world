import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con';
import Package from '@/models/PackageModel';

// UPDATE an existing package
export async function PUT(req, { params }) {
    const { packageId } = params; // Get the package ID from the URL
    const id = packageId;

    // Destructure the necessary fields from the request body
    const { price, description, name } = await req.json();

    try {
        await dbConnect(); // Connect to the database
        const updatedPackage = await Package.findByIdAndUpdate(id, {
            price,
            description,
            name
        }, { new: true }); // Return the updated document

        // Check if the package was found and updated
        if (!updatedPackage) {
            return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Package updated successfully', package: updatedPackage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update package', error: error.message }, { status: 500 });
    }
}

// DELETE a package
export async function DELETE(req, { params }) {
    const { packageId } = params; // Get the package ID from the URL
    const id = packageId;

    // Validate the ID
    if (!id) {
        return NextResponse.json({ message: 'Package ID is required' }, { status: 400 });
    }

    try {
        await dbConnect(); // Connect to the database
        await Package.findByIdAndDelete(id); // Delete the package

        return NextResponse.json({ message: 'Package deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete package', error: error.message }, { status: 500 });
    }
}
