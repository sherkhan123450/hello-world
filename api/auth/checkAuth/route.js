import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token
    console.log(token , 'this is token')
    if (!token) {
        return NextResponse.json({ error: 'No token found' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        return NextResponse.json({ decoded }); // Return the decoded token or user info
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 }); // Always return JSON
    }
}
