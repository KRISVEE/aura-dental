"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function DashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query") || "";
  const currentStatus = searchParams.get("status") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  const [localQuery, setLocalQuery] = useState(currentQuery);

  useEffect(() => {
    setLocalQuery(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== currentQuery) {
        updateParams({ query: localQuery });
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localQuery]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search Ref, Name, Email, Phone..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </div>
      
      <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Status:
          </label>
          <select
            id="statusFilter"
            value={currentStatus}
            onChange={(e) => updateParams({ status: e.target.value === "all" ? null : e.target.value })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm rounded-md"
          >
            <option value="all">All Bookings</option>
            <option value="pending_confirmation">Pending Confirmation</option>
            <option value="confirmed">Confirmed</option>
            <option value="consultation_scheduled">Consultation Scheduled</option>
            <option value="treatment_planned">Treatment Planned</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="sortFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort:
          </label>
          <select
            id="sortFilter"
            value={currentSort}
            onChange={(e) => updateParams({ sort: e.target.value === "newest" ? null : e.target.value })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm rounded-md"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
}
