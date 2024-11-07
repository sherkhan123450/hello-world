// app/api/profiles/[email]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db_con'; // Adjust the import path as necessary
import User from '@/models/UserModel'; // Adjust the import path as necessary

// API route to handle GET requests
export async function GET(req, { params }) {

    const { email } = await params;

    try {
        // Ensure database connection
        await dbConnect();

        // Fetch user document by email
        const user = await User.findOne({ email }).exec(); // Ensure to use .exec() for Mongoose queries

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Return user data
        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
            address: user.address,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
