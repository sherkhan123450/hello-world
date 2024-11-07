import User from '@/models/UserModel';
import dbConnect from "@/lib/db_con";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await dbConnect(); // Ensure that you await the db connection

    try {
        const users = await User.find();

        if (users.length === 0) {
            return new NextResponse({ message: "Users not found" }, { status: 404 });
        }

        return new NextResponse(JSON.stringify(users), { status: 200 });

    } catch (err) {
        return new NextResponse(JSON.stringify({ message: "Error getting user info" }), { status: 500 });
    }
}
