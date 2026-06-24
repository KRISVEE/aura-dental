import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { createBooking } from "@/services/bookings";
import { sendReceptionNotification, sendPatientConfirmation } from "@/services/email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  console.log("\n--- [WEBHOOK] Received Event ---");

  let event: Stripe.Event;

  try {
    if (!signature) {
      console.error("[WEBHOOK] Error: Missing stripe-signature header");
      return new NextResponse("Missing stripe-signature header", { status: 400 });
    }
    
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("[WEBHOOK] Error: Missing STRIPE_WEBHOOK_SECRET environment variable");
      return new NextResponse("Server Configuration Error", { status: 500 });
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log(`[WEBHOOK] Signature verified successfully. Event type: ${event.type}`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[WEBHOOK] Signature verification failed: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.amount_capturable_updated":
        const paymentIntentAuth = event.data.object as Stripe.PaymentIntent;
        console.log(`[STRIPE] Payment authorized (manual capture) for £${paymentIntentAuth.amount / 100}`);
        
        const metadata = paymentIntentAuth.metadata;
        if (!metadata || !metadata.email) {
          console.error("[STRIPE] Error: Missing booking metadata in payment intent");
          break; 
        }

        console.log(`[WEBHOOK] Extracted metadata for patient: ${metadata.firstName} ${metadata.lastName} (${metadata.email})`);

        let booking;
        try {
          console.log("[SUPABASE] Attempting to insert booking...");
          booking = await createBooking({
            first_name: metadata.firstName,
            last_name: metadata.lastName,
            email: metadata.email,
            phone: metadata.phone,
            dob: metadata.dob,
            treatment_interest: metadata.treatment,
            preferred_time: metadata.preferredTime,
            stripe_payment_intent_id: paymentIntentAuth.id,
            status: "pending",
          });
          console.log(`[SUPABASE] Success: Booking inserted with ID: ${booking.id}`);
        } catch (dbError: unknown) {
          const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
          if (errorMessage === "Duplicate booking for this payment intent") {
            console.warn(`[SUPABASE] Warning: Idempotency check passed. Booking for intent ${paymentIntentAuth.id} already exists.`);
            // We exit early because we don't want to double-send emails for retries
            return new NextResponse(null, { status: 200 });
          } else {
            console.error(`[SUPABASE] Error inserting booking: ${errorMessage}`);
            throw dbError; 
          }
        }

        try {
          console.log("[WEBHOOK] Booking successfully inserted into Supabase.");
          console.log("[EMAIL] Attempting to dispatch emails...");
          // We must await the promise array so Next.js doesn't terminate the function early
          const [receptionResult, patientResult] = await Promise.all([
            sendReceptionNotification(booking),
            sendPatientConfirmation(booking)
          ]);
          
          if (receptionResult) console.log(`[EMAIL] Success: Receptionist notification sent (ID: ${receptionResult.id})`);
          if (patientResult) console.log(`[EMAIL] Success: Patient confirmation sent (ID: ${patientResult.id})`);
        } catch (emailError: unknown) {
          const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
          console.error(`[EMAIL] Non-fatal error during email dispatch: ${errorMessage}`);
          // We don't throw because the booking was saved. Return 200 to Stripe.
        }
        
        break;

      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.warn(`[STRIPE] Payment failed: ${paymentIntentFailed.last_payment_error?.message}`);
        break;

      case "payment_intent.canceled":
        console.log("[STRIPE] Payment canceled by user or system");
        break;

      default:
        console.log(`[WEBHOOK] Ignored unhandled event type: ${event.type}`);
    }

    console.log("--- [WEBHOOK] Processing Complete ---\n");
    return new NextResponse(null, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[WEBHOOK] Critical error processing webhook: ${errorMessage}`);
    return new NextResponse(`Webhook Handler Error: ${errorMessage}`, { status: 500 });
  }
}


