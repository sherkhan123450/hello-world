import dbConnect from '@/lib/db_con';
import Contact from '@/models/ContactModel';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    await dbConnect();

    try {
        const contact_data = await req.json();  // Parse the incoming request data


        const contact = new Contact(contact_data);
        await contact.save();

        return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error saving contact:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
};
