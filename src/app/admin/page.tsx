import { createClient } from "@/utils/supabase/server";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { Booking } from "@/types/database";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">
          Failed to load bookings. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-navy">Admin Dashboard</h1>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm font-medium text-gray-500 hover:text-navy transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage patient consultation requests and deposits.
            </p>
          </div>
          <BookingsTable initialBookings={bookings as Booking[]} />
        </div>
      </main>
    </div>
  );
}
