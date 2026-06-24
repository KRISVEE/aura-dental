export type BookingStatus = "pending_confirmation" | "confirmed" | "consultation_scheduled" | "treatment_planned" | "completed" | "refunded" | "cancelled";

export interface Booking {
  id: string;
  booking_reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  treatment_interest: string;
  preferred_time: string;
  stripe_payment_intent_id: string;
  status: BookingStatus;
  created_at: string;
}

export interface BookingInsert {
  booking_reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  treatment_interest: string;
  preferred_time: string;
  stripe_payment_intent_id: string;
  status?: BookingStatus;
}
