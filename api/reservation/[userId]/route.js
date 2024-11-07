import dbConnect from "@/lib/db_con"; // Ensure this connects to your MongoDB
import Reservation from "@/models/ReservationModel"; // Ensure this path is correct
import { NextResponse } from "next/server";

// Handle POST requests for saving a reservation
export const POST = async (request, { params }) => {
  const { userId } = params;
  const reservationData = await request.json(); // Get the reservation data from the request body

  console.log(reservationData, "reservationData", userId);

  await dbConnect(); // Connect to the database

  try {
    const newReservation = new Reservation({ userId, ...reservationData });
    await newReservation.save();
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error saving reservation:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to save reservation." },
      { status: 400 }
    );
  }
};

// Handle GET requests for fetching reservations
export const GET = async (request, { params }) => {
  const { userId } = params;
  await dbConnect(); // Connect to the database

  try {
    // Fetch reservations for the user
    const reservations = await Reservation.find({ userId });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to fetch reservations." },
      { status: 500 }
    );
  }
};
