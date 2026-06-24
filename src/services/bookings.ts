import { createServerClient } from "@/lib/supabase";
import { Booking, BookingInsert, BookingStatus } from "@/types/database";

// Insert a new booking record
export async function createBooking(data: BookingInsert): Promise<Booking> {
  const supabase = createServerClient();

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        treatment_interest: data.treatment_interest,
        preferred_time: data.preferred_time,
        stripe_payment_intent_id: data.stripe_payment_intent_id,
        status: data.status || "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") { // Unique violation
      throw new Error("Duplicate booking for this payment intent");
    }
    throw error;
  }

  return booking as Booking;
}

// Fetch all bookings (for future admin use)
export async function getBookings(): Promise<Booking[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Booking[];
}

// Fetch a single booking by its ID
export async function getBookingById(id: string): Promise<Booking | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // No rows found
    throw error;
  }
  return data as Booking;
}

// Update the status of a booking (e.g. pending -> confirmed -> completed)
export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}
