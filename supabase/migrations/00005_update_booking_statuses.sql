-- Migration to add new booking statuses for the complete lifecycle

-- Postgres Error 55P04 Workaround: 
-- Postgres does not allow you to add an ENUM value and then use it in the same transaction block.
-- Because Supabase SQL Editor wraps your scripts in a transaction, you MUST run this in TWO SEPARATE STEPS.

-- ==========================================
-- STEP 1: HIGHLIGHT ONLY THIS BLOCK AND CLICK RUN
-- ==========================================
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'pending_confirmation';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'consultation_scheduled';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'treatment_planned';

-- ==========================================
-- STEP 2: HIGHLIGHT ONLY THIS BLOCK AND CLICK RUN (AFTER STEP 1 FINISHES)
-- ==========================================
-- Update existing bookings to use 'pending_confirmation'
UPDATE public.bookings
SET status = 'pending_confirmation';

-- Update the default value of the column
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'pending_confirmation';
