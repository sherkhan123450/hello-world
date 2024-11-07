import dbConnect from "@/lib/db_con";
import User from "@/models/UserModel"; // Adjust the import path as needed
import { NextResponse } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt"; // Import bcrypt for hashing

const generateTempPassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let tempPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    tempPassword += charset[randomIndex];
  }
  return tempPassword;
};

export const POST = async (req) => {
  try {
    const requestBody = await req.json();
    const { email } = requestBody;

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tempPassword = generateTempPassword(); // Generate temporary password

    // Hash the temporary password if you need to store it (optional)

    // Send the temporary password to the user's email using Formspree
    const response = await axios.post("https://formspree.io/f/xyzyzzzw", {
      email,
      message: `Your temporary password is: ${tempPassword}`, // Send plain temp password
    });

    user.tempPassword = tempPassword; // Store the temporary password in the user's document
    await user.save();

    if (response.status === 200) {
      return NextResponse.json({
        message: "Temporary password sent successfully to your email.",
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending temporary password:", error);
    return NextResponse.json(
      { error: "Failed to send temporary password" },
      { status: 500 }
    );
  }
};
