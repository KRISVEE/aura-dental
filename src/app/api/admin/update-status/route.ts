import { NextResponse } from "next/server";
import { updateBookingStatus } from "@/services/bookings";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Booking ID and status are required." },
        { status: 400 }
      );
    }

    const updatedBooking = await updateBookingStatus(bookingId, status);

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update booking status." },
      { status: 500 }
    );
  }
}
