import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Img,
} from "@react-email/components";
import * as React from "react";
import { Booking } from "@/types/database";

interface PatientConfirmationProps {
  booking: Booking;
}

export const PatientConfirmation = ({
  booking,
}: PatientConfirmationProps) => {
  const previewText = "Your consultation request has been received by Aura Dental.";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Aura Dental</Heading>
          
          <Text style={greeting}>Dear {booking.first_name},</Text>
          
          <Text style={text}>
            Thank you for choosing Aura Dental. We have successfully received your consultation request and secured your £50 holding deposit.
          </Text>

          <Section style={section}>
            <Heading as="h2" style={h2}>Your Request Details</Heading>
            <Text style={text}><strong>Interest:</strong> <span style={{textTransform: "capitalize"}}>{booking.treatment_interest}</span></Text>
            <Text style={text}><strong>Preferred Time:</strong> <span style={{textTransform: "capitalize"}}>{booking.preferred_time}</span></Text>
            <Text style={text}><strong>Deposit:</strong> £50.00 Paid</Text>
          </Section>
          
          <Hr style={hr} />

          <Heading as="h2" style={h2}>Next Steps</Heading>
          <Text style={text}>
            Our concierge team is currently reviewing your request. We will contact you at <strong>{booking.phone}</strong> shortly to confirm the exact date and time of your appointment.
          </Text>
          <Text style={text}>
            Please note that your £50 holding deposit is fully refundable upon attendance, or it can be applied directly toward your treatment costs.
          </Text>

          <Text style={signoff}>
            Warm regards,<br />
            <strong>The Aura Dental Team</strong>
          </Text>

          <Text style={footer}>
            123 Harley Street, London, W1G 6BG<br />
            +44 (0) 20 7123 4567 | hello@auradental.co.uk
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PatientConfirmation;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 30px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const h1 = {
  color: "#D4AF37", // Gold
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.4",
  margin: "0 0 30px",
  textAlign: "center" as const,
  fontFamily: "Georgia, serif",
};

const h2 = {
  color: "#0a192f", // Navy
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 10px",
};

const greeting = {
  color: "#0a192f",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 15px",
};

const text = {
  color: "#4b5563", // Charcoal
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 15px",
};

const signoff = {
  color: "#0a192f",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "30px 0 0",
};

const section = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  margin: "25px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "25px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "40px",
  lineHeight: "1.5",
};
