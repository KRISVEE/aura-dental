import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request
    const body = await request.json();
    const { bookingId, paymentIntentId } = body;

    if (!bookingId || !paymentIntentId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // 3. Cancel the Stripe PaymentIntent
    // Since the payment is 'manual' capture, the funds are held.
    // Canceling the intent releases the funds back to the customer.
    try {
      await stripe.paymentIntents.cancel(paymentIntentId);
    } catch (stripeError: any) {
      console.error("[REFUND ERROR] Stripe cancel failed:", stripeError);
      
      // If the intent is already canceled or cannot be canceled, Stripe throws an error.
      // We might want to allow updating the local DB status anyway if it's already canceled.
      if (stripeError.code !== "resource_missing" && stripeError.code !== "payment_intent_unexpected_state") {
        return NextResponse.json(
          { error: stripeError.message || "Failed to cancel payment in Stripe" },
          { status: 500 }
        );
      }
    }

    // 4. Update Supabase
    const { error: dbError } = await supabase
      .from("bookings")
      .update({ status: "refunded" })
      .eq("id", bookingId);

    if (dbError) {
      console.error("[REFUND ERROR] Supabase update failed:", dbError);
      return NextResponse.json(
        { error: "Payment canceled but failed to update database status." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[REFUND ERROR] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
