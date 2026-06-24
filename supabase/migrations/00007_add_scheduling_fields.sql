-- Migration to add scheduling and internal management fields to bookings

ALTER TABLE public.bookings
ADD COLUMN consultation_date DATE NULL,
ADD COLUMN consultation_time TIME NULL,
ADD COLUMN admin_notes TEXT NULL;
