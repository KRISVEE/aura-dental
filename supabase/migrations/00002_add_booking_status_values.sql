-- Add new values to the booking_status ENUM to support the admin dashboard flow
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'deposit_held';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'refunded';
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'forfeited';

-- Note: Because Supabase doesn't allow removing ENUM values easily without table recreation,
-- we're just appending the new ones. 'pending' will eventually be phased out in favor of 'deposit_held'.
