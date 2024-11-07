import dbConnect from "@/lib/db_con";
import Reservation from "@/models/ReservationModel"; // Ensure this path is correct
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { userId, reservationId } = params;
  try {
    await dbConnect();

    // Update the isCanceled field to true
    const updatedReservation = await Reservation.findOneAndUpdate(
      {
        userId: userId,
        _id: reservationId,
      },
      { isCanceled: true }, // Update to set isCanceled to true
      { new: true } // Return the updated document
    );

    if (!updatedReservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reservation canceled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error canceling reservation:", error);
    return NextResponse.json(
      { error: "Failed to cancel reservation" },
      { status: 500 }
    );
  }
};

export async function DELETE(request, { params }) {
  const { reservationId } = params;
  await dbConnect(); // Connect to the database

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );
    if (!deletedReservation) {
      return NextResponse.json(
        { error: "Reservation not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Reservation deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete reservation." },
      { status: 500 }
    );
  }
}
