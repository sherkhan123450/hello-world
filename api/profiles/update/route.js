import dbConnect from "@/lib/db_con"; // Adjust the import path as necessary
import User from "@/models/UserModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function PUT(req) {
  const { firstName, lastName, email, phoneNumber, password, address } =
    await req.json();

  // Ensure the connection is established
  await dbConnect();

  try {
    // Check if the user with the given email exists

    // Check if another user with the same email and password exists
    const conflictingUser = await User.findOne({ email, password });
    if (
      conflictingUser &&
      conflictingUser._id.toString() !== existingUser._id.toString()
    ) {
      return NextResponse.json(
        { error: "Email and password already in use by another user" },
        { status: 409 }
      );
    }

    // Check if another user with the specified phone number exists, excluding the current user
    const phoneNumberUser = await User.findOne({
      phoneNumber,
      email: { $ne: email },
    });
    if (phoneNumberUser) {
      return NextResponse.json(
        { error: "Email or phone number already in use" },
        { status: 409 }
      );
    }

    // Update the user document
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Find user by email
      { firstName, lastName, phoneNumber, address }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      isVerified: updatedUser.isVerified,
      isAdmin: updatedUser.isAdmin,
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
