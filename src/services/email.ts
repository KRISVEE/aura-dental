import { resend } from "@/lib/resend";
import { Booking } from "@/types/database";
import ReceptionistNotification from "@/emails/ReceptionistNotification";
import PatientConfirmation from "@/emails/PatientConfirmation";
import * as React from "react";

const CLINIC_EMAIL = "hello@auradental.co.uk"; 
// In development with Resend free tier, emails can only be sent TO the verified domain/email.
// To avoid errors locally, we will fallback to a default email if provided via env var, or you can hardcode your own email for testing.
const TEST_EMAIL = process.env.NODE_ENV === "development" ? "onboarding@resend.dev" : null;

export async function sendReceptionNotification(booking: Booking) {
  try {
    const toAddress = TEST_EMAIL || CLINIC_EMAIL;
    console.log(`[EMAIL] Sending Reception notification...`);
    console.log(`[EMAIL] From: Aura Dental <onboarding@resend.dev> | To: ${toAddress}`);
    
    const response = await resend.emails.send({
      from: "Aura Dental <onboarding@resend.dev>",
      to: toAddress,
      subject: `New Implant Consultation Deposit Received - ${booking.first_name} ${booking.last_name}`,
      react: React.createElement(ReceptionistNotification, { booking }),
    });

    console.log(`[EMAIL] Resend API Response (Reception): ${JSON.stringify(response)}`);

    if (response.error) {
      console.error(`[EMAIL] Resend API Error (Reception):`, response.error);
      throw response.error;
    }
    
    return response.data;
  } catch (error) {
    console.error("[EMAIL] Resend service error (Receptionist):", error);
    // Don't throw, we want to fail gracefully
    return null;
  }
}

export async function sendPatientConfirmation(booking: Booking) {
  try {
    const toAddress = TEST_EMAIL || booking.email;
    console.log(`[EMAIL] Sending Patient confirmation...`);
    console.log(`[EMAIL] From: Aura Dental <onboarding@resend.dev> | To: ${toAddress}`);
    
    const response = await resend.emails.send({
      from: "Aura Dental <onboarding@resend.dev>",
      to: toAddress,
      subject: "Your Consultation Request Has Been Received",
      react: React.createElement(PatientConfirmation, { booking }),
    });

    console.log(`[EMAIL] Resend API Response (Patient): ${JSON.stringify(response)}`);

    if (response.error) {
      console.error(`[EMAIL] Resend API Error (Patient):`, response.error);
      throw response.error;
    }
    
    return response.data;
  } catch (error) {
    console.error("[EMAIL] Resend service error (Patient):", error);
    // Don't throw, we want to fail gracefully
    return null;
  }
}
