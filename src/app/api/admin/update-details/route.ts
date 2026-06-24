import { NextResponse } from "next/server";
import { updateBookingDetails } from "@/services/bookings";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, details } = body;

    if (!bookingId || !details) {
      return NextResponse.json(
        { error: "Booking ID and details are required." },
        { status: 400 }
      );
    }

    const updatedBooking = await updateBookingDetails(bookingId, details);

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    console.error("Error updating booking details:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update booking details." },
      { status: 500 }
    );
  }
}
