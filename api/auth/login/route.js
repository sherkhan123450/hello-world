import dbConnect from "@/lib/db_con";
import User from "@/models/UserModel"; // Adjust the import path as needed
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/models/UserSchema";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a secure secret in production

export const POST = async (req) => {
  try {
    // Parse and validate the request body with Zod
    const requestBody = await req.json();
    const { email, password } = loginSchema.parse(requestBody);

    // Connect to the database
    await dbConnect();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "incorrect credientials user not found" },
        { status: 404 }
      );
    }

    console.log(user.password , 'the user password')
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate a JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        phoneNumber: user.phoneNumber,
        username: user.firstName + user.lastName,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Return the token along with a success message and user data (excluding password)
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error logging in user:", error);
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 });
  }
};
