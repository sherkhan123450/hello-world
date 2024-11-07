import dbConnect from "@/lib/db_con";
import User from "@/models/UserModel"; // Adjust the import path as needed
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/models/UserSchema"; // Adjust the import path as needed
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use a secure secret in production

export const POST = async (req) => {
  try {
    // Parse and validate the request body with Zod
    const requestBody = await req.json();
    const { firstName, lastName, email, password, phoneNumber, address } =
      signUpSchema.parse(requestBody);

    // Connect to the database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return NextResponse.json(
        { error: "Phone number already in use" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    // Save the user to the database
    const createdUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: createdUser._id, // User's unique ID
        email: createdUser.email, // User's email
        isAdmin: createdUser.isAdmin,
        username: createdUser.firstName + createdUser.lastName,
        phoneNumber: createdUser.phoneNumber, // Admin status, if applicable
      },
      JWT_SECRET, // Secret key for JWT
      {
        expiresIn: "30d", // Token expires in 1 day
      }
    );

    // Construct the response payload
    const userResponse = {
      id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phoneNumber: createdUser.phoneNumber,
    };

    // Send the response
    return NextResponse.json({
      message: "User registered successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
};
