import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { Booking } from "@/types/database";

interface ReceptionistNotificationProps {
  booking: Booking;
}

export const ReceptionistNotification = ({
  booking,
}: ReceptionistNotificationProps) => {
  const previewText = `New Deposit: £50 from ${booking.first_name} ${booking.last_name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Deposit Received</Heading>
          <Text style={text}>
            A patient has successfully paid a £50 holding deposit for a consultation.
          </Text>

          <Section style={section}>
            <Heading as="h2" style={h2}>Patient Details</Heading>
            <Text style={text}><strong>Name:</strong> {booking.first_name} {booking.last_name}</Text>
            <Text style={text}><strong>Email:</strong> {booking.email}</Text>
            <Text style={text}><strong>Phone:</strong> {booking.phone}</Text>
            <Text style={text}><strong>DOB:</strong> {booking.dob}</Text>
          </Section>
          
          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={h2}>Booking Request</Heading>
            <Text style={text}><strong>Interest:</strong> <span style={{textTransform: "capitalize"}}>{booking.treatment_interest}</span></Text>
            <Text style={text}><strong>Preferred Time:</strong> <span style={{textTransform: "capitalize"}}>{booking.preferred_time}</span></Text>
            <Text style={text}><strong>Deposit Status:</strong> Secured (£50 GBP)</Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`tel:${booking.phone.replace(/\s+/g, '')}`}>
              Call Patient Now
            </Button>
          </Section>

          <Text style={footer}>
            Aura Dental Admin • This is an automated system notification.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ReceptionistNotification;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const h1 = {
  color: "#0a192f",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 15px",
};

const h2 = {
  color: "#0a192f",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 10px",
};

const text = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 10px",
};

const section = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
  marginBottom: "20px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#0a192f",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 24px",
};

const footer = {
  color: "#9ca3af",
  fontSize: "13px",
  textAlign: "center" as const,
  marginTop: "40px",
};
