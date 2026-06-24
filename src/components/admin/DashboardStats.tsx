import React from "react";

export function DashboardStats({ stats }: { stats: {
  total: number;
  pending: number;
  scheduled: number;
  completed: number;
  refunded: number;
  cancelled: number;
}}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <StatCard label="Total Bookings" value={stats.total} color="bg-gray-100 text-gray-800" />
      <StatCard label="Pending" value={stats.pending} color="bg-amber-100 text-amber-800" />
      <StatCard label="Scheduled" value={stats.scheduled} color="bg-indigo-100 text-indigo-800" />
      <StatCard label="Completed" value={stats.completed} color="bg-green-100 text-green-800" />
      <StatCard label="Refunded" value={stats.refunded} color="bg-gray-200 text-gray-700" />
      <StatCard label="Cancelled" value={stats.cancelled} color="bg-red-100 text-red-800" />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center justify-center text-center">
      <span className="text-2xl font-bold text-navy mb-1">{value}</span>
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
        {label}
      </span>
    </div>
  );
}
