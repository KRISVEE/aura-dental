-- Add booking_reference column to bookings table
ALTER TABLE bookings
ADD COLUMN booking_reference TEXT;

-- Generate a unique reference for existing rows (if any)
-- Format: AD-YYYYMMDD-XXXX
UPDATE bookings 
SET booking_reference = 'AD-' || TO_CHAR(created_at, 'YYYYMMDD') || '-' || SUBSTRING(MD5(id::text) FROM 1 FOR 4)
WHERE booking_reference IS NULL;

-- Make the column NOT NULL and UNIQUE
ALTER TABLE bookings
ALTER COLUMN booking_reference SET NOT NULL,
ADD CONSTRAINT bookings_booking_reference_key UNIQUE (booking_reference);
