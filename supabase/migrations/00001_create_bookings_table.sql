CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    dob DATE NOT NULL,
    treatment_interest TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    stripe_payment_intent_id TEXT NOT NULL UNIQUE,
    status booking_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_stripe_pi ON public.bookings(stripe_payment_intent_id);

-- Optional: Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow inserts via Service Role (Webhook)
-- Since the webhook runs server-side with the Service Role Key, 
-- it automatically bypasses RLS, but it's good practice to secure the table against public access.
