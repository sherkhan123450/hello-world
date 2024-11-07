// app/api/reservations/[userId]/route.js
import dbConnect from "@/lib/db_con";
import Reservation from "@/models/ReservationModel"; // Ensure this path is correct
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const reservations = await Reservation.find();
    console.log(reservations, "hello world");
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve reservations" },
      { status: 500 }
    );
  }
};

