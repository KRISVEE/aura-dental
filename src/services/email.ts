import { resend } from "@/lib/resend";
import { Booking } from "@/types/database";

const CLINIC_EMAIL = "yoitspandamon@gmail.com"; 
// In development or on Resend free tier, emails can only be sent TO the verified email address.
// We override the patient email and clinic email to your verified address so you can test it.
const TEST_EMAIL = "yoitspandamon@gmail.com";

export async function sendReceptionNotification(booking: Booking) {
  try {
    const toAddress = TEST_EMAIL || CLINIC_EMAIL;
    console.log(`[EMAIL] Sending Reception notification...`);
    console.log(`[EMAIL] From: Aura Dental <onboarding@resend.dev> | To: ${toAddress}`);
    
    const response = await resend.emails.send({
      from: "Aura Dental <onboarding@resend.dev>",
      to: toAddress,
      subject: `New Implant Consultation Deposit Received - ${booking.first_name} ${booking.last_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0a192f;">New Booking Received</h1>
          <p>A new £50 deposit has been paid for a consultation.</p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p><strong>Booking Ref:</strong> <span style="font-family: monospace; font-size: 16px;">${booking.booking_reference}</span></p>
            <p><strong>Status:</strong> <span style="color: #ca8a04; font-weight: bold;">Pending Confirmation</span></p>
            <p><strong>Patient:</strong> ${booking.first_name} ${booking.last_name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>DOB:</strong> ${booking.dob}</p>
            <p><strong>Treatment Interest:</strong> <span style="text-transform: capitalize;">${booking.treatment_interest}</span></p>
            <p><strong>Preferred Time:</strong> <span style="text-transform: capitalize;">${booking.preferred_time}</span></p>
          </div>
          <p>Please contact the patient to confirm the exact appointment time.</p>
        </div>
      `,
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
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37;">Aura Dental</h1>
          <p>Dear ${booking.first_name},</p>
          <p>Thank you for choosing Aura Dental. We have successfully received your consultation request and secured your £50 holding deposit.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Your Request Details</h2>
            <p><strong>Booking Reference:</strong> <span style="font-family: monospace; font-size: 16px;">${booking.booking_reference}</span></p>
            <p><strong>Status:</strong> <span style="color: #ca8a04; font-weight: bold;">Pending Confirmation</span></p>
            <p><strong>Interest:</strong> <span style="text-transform: capitalize;">${booking.treatment_interest}</span></p>
            <p><strong>Preferred Time:</strong> <span style="text-transform: capitalize;">${booking.preferred_time}</span></p>
            <p><strong>Deposit:</strong> £50.00 Paid</p>
          </div>
          
          <h2>Next Steps</h2>
          <p>Our concierge team is currently reviewing your request. We will contact you at <strong>${booking.phone}</strong> shortly to confirm the exact date and time of your appointment.</p>
          <p>Please note that your £50 holding deposit is fully refundable upon attendance, or it can be applied directly toward your treatment costs.</p>
          
          <p style="margin-top: 30px;">
            Warm regards,<br />
            <strong>The Aura Dental Team</strong>
          </p>
        </div>
      `,
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
