-- Add RLS policies for authenticated admin users
-- This allows any logged-in user (admins) to SELECT and UPDATE bookings
-- In a real production system, you would restrict this further to specific user IDs or roles.

CREATE POLICY "Enable read access for authenticated users" 
ON public.bookings 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable update access for authenticated users" 
ON public.bookings 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);
