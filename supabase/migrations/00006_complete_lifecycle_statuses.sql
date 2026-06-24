-- Migration to finalize all booking statuses
-- Adds 'refunded' to the enum and ensures the default is pending_confirmation

-- Workaround for adding enum values within a transaction block (Postgres 55P04)
COMMIT;
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'refunded';
BEGIN;

-- Explicitly enforce the default for all future bookings
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'pending_confirmation';

-- Ensure any existing legacy pending bookings are migrated
UPDATE public.bookings SET status = 'pending_confirmation' WHERE status = 'pending';
