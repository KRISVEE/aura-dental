import { createClient } from "@/utils/supabase/server";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardFilters } from "@/components/admin/DashboardFilters";
import { Booking } from "@/types/database";

export default async function AdminDashboardPage(props: {
  searchParams: Promise<{ query?: string; status?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";
  const status = searchParams.status || "all";
  const sort = searchParams.sort || "newest";

  const supabase = await createClient();

  // 1. Fetch lightweight stats
  const { data: allStatuses, error: statsError } = await supabase
    .from("bookings")
    .select("status");

  if (statsError) {
    console.error("Error fetching stats:", statsError);
  }

  const stats = {
    total: allStatuses?.length || 0,
    pending: allStatuses?.filter((b) => b.status === "pending_confirmation").length || 0,
    scheduled: allStatuses?.filter((b) => b.status === "consultation_scheduled").length || 0,
    completed: allStatuses?.filter((b) => b.status === "completed").length || 0,
    refunded: allStatuses?.filter((b) => b.status === "refunded").length || 0,
    cancelled: allStatuses?.filter((b) => b.status === "cancelled").length || 0,
  };

  // 2. Build the main query
  let supabaseQuery = supabase.from("bookings").select("*");

  if (status !== "all") {
    supabaseQuery = supabaseQuery.eq("status", status);
  }

  if (query) {
    const searchPattern = `%${query}%`;
    supabaseQuery = supabaseQuery.or(
      `booking_reference.ilike.${searchPattern},first_name.ilike.${searchPattern},last_name.ilike.${searchPattern},email.ilike.${searchPattern},phone.ilike.${searchPattern}`
    );
  }

  if (sort === "oldest") {
    supabaseQuery = supabaseQuery.order("created_at", { ascending: true });
  } else {
    supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
  }

  const { data: bookings, error } = await supabaseQuery;

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
        <DashboardStats stats={stats} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <DashboardFilters />
          <BookingsTable initialBookings={bookings as Booking[]} />
        </div>
      </main>
    </div>
  );
}
