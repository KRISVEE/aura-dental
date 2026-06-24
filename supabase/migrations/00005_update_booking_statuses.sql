-- Migration to add new booking statuses for the complete lifecycle

-- 1. Add new values to the enum
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'pending_confirmation';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'consultation_scheduled';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'treatment_planned';

-- 2. Update existing bookings to use 'pending_confirmation'
-- Since the user requested: "Ensure all existing bookings are automatically assigned: Status = Pending Confirmation"
UPDATE public.bookings
SET status = 'pending_confirmation';

-- 3. Update the default value of the column
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'pending_confirmation';
