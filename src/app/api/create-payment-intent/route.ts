import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { treatment, preferredTime, patientDetails } = body;

    if (!treatment || !preferredTime || !patientDetails) {
      return NextResponse.json(
        { error: "Missing required booking details" },
        { status: 400 }
      );
    }

    // Generate a unique booking reference
    // Format: AD-YYYYMMDD-XXXX
    const date = new Date();
    const dateString = date.toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const bookingReference = `AD-${dateString}-${randomSuffix}`;

    // Create a PaymentIntent with a manual capture method.
    // This authorizes the card for £50 but does not capture the funds yet,
    // allowing the clinic to capture or release the funds later.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // £50 in pence
      currency: "gbp",
      capture_method: "manual",
      automatic_payment_methods: {
        enabled: true,
      },
      // Store the patient's form data in metadata so it's available in the webhook
      metadata: {
        bookingReference,
        treatment,
        preferredTime,
        firstName: patientDetails.firstName,
        lastName: patientDetails.lastName,
        email: patientDetails.email,
        phone: patientDetails.phone,
        dob: patientDetails.dob,
      },
      // Optionally add receipt email to automatically send a receipt upon capture
      receipt_email: patientDetails.email,
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      bookingReference
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
