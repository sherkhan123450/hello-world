import dbConnect from "@/lib/db_con";
import UserIdFR from "@/models/userIdFrModel";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await dbConnect();

  const { userId } = await req.json();

  // Define a constant code value for searching
  const code = "hello";

  try {
    // Try to update the existing document
    let updatedUserIdFR = await UserIdFR.findOneAndUpdate(
      { code },
      { userIdFR: userId },
      { new: true }
    );

    console.log("Updated or created userIdFR:", updatedUserIdFR);

    if (!updatedUserIdFR) {
      updatedUserIdFR = await UserIdFR.create({ code, userIdFR: userId });
    }

    return NextResponse.json(updatedUserIdFR);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to update or create userIdFR" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const userIdFRs = await UserIdFR.find();
    return NextResponse.json(userIdFRs);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch userIdFR entries" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  await dbConnect();

  try {
    await UserIdFR.deleteMany();
    return NextResponse.json({ message: "All userIdFR entries deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete userIdFR entries" },
      { status: 500 }
    );
  }
}
