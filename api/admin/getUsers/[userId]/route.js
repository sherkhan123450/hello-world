import dbConnect from "@/lib/db_con";
import User  from "@/models/UserModel";
import {NextResponse} from "next/server";

export async function PUT(req , {params}) {
    const { userId } = params;
    dbConnect();
    try {
        const user = await User.findById(userId);
        const isAdmin = !user.isAdmin;
        const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update User isAdmin' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { userId } = params;
    dbConnect();

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
