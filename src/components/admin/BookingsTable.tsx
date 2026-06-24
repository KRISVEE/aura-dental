"use client";

import React, { useState, useMemo } from "react";
import { Booking, BookingStatus } from "@/types/database";
import { format } from "date-fns";
import { RefreshCcw, AlertCircle, Search, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const router = useRouter();

  const handleRefund = async (bookingId: string, paymentIntentId: string) => {
    if (!confirm("Are you sure you want to cancel this booking and release the deposit hold? This action cannot be undone.")) {
      return;
    }

    setRefundingId(bookingId);
    try {
      const response = await fetch("/api/admin/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, paymentIntentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process refund");
      }

      toast.success("Deposit released and booking refunded successfully.");
      
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "refunded" } : b))
      );
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred while refunding.");
    } finally {
      setRefundingId(null);
    }
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    setUpdatingId(bookingId);
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      toast.success("Booking status updated successfully.");
      
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_confirmation":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Pending Confirmation
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Confirmed
          </span>
        );
      case "consultation_scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Consultation Scheduled
          </span>
        );
      case "treatment_planned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Treatment Planned
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Refunded
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
            {status.replace("_", " ")}
          </span>
        );
    }
  };

  const getDepositStatus = (status: string) => {
    if (status === "refunded") return "Refunded";
    if (status === "cancelled") return "Forfeited";
    return "Paid £50";
  };

  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((b) => 
        b.booking_reference?.toLowerCase().includes(query) ||
        b.first_name.toLowerCase().includes(query) ||
        b.last_name.toLowerCase().includes(query) ||
        b.email.toLowerCase().includes(query) ||
        b.phone.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [bookings, searchQuery, statusFilter]);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
        <p>New consultation requests will appear here once deposits are paid.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-navy focus:border-navy sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search Ref, Name, Email, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Filter:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Ref
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Booked
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Treatment & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deposit Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <React.Fragment key={booking.id}>
                <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono font-medium text-navy bg-navy/5 px-2 py-1 rounded">
                      {booking.booking_reference || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(booking.created_at), "MMM d, yyyy")}
                    <br />
                    <span className="text-xs">{format(new Date(booking.created_at), "h:mm a")}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.first_name} {booking.last_name}
                    </div>
                    <div className="text-sm text-gray-500">{booking.email}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{booking.treatment_interest}</div>
                    <div className="text-sm text-gray-500 capitalize">{booking.preferred_time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getDepositStatus(booking.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {updatingId === booking.id ? (
                        <span className="inline-flex items-center text-sm text-gray-500">
                          <RefreshCcw className="w-4 h-4 mr-1.5 animate-spin" />
                          Updating...
                        </span>
                      ) : (
                        <select
                          className="block w-full max-w-[180px] pl-3 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-navy focus:border-navy rounded-md"
                          value={booking.status}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value as BookingStatus)}
                        >
                          <option value="pending_confirmation">Pending Confirmation</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="consultation_scheduled">Consultation Scheduled</option>
                          <option value="treatment_planned">Treatment Planned</option>
                          <option value="completed">Completed</option>
                          <option value="refunded">Refunded</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}

                      {/* We can still allow refund if it's pending/confirmed and not yet refunded */}
                      {(booking.status === "pending_confirmation" || booking.status === "confirmed") && (
                        <button
                          onClick={() => handleRefund(booking.id, booking.stripe_payment_intent_id)}
                          disabled={refundingId === booking.id || updatingId === booking.id}
                          className="inline-flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {refundingId === booking.id ? (
                            <RefreshCcw className="w-3 h-3 mr-1 animate-spin" />
                          ) : null}
                          Issue Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedId === booking.id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                      <ExpandedDetailsPanel 
                        booking={booking} 
                        onUpdate={(updated) => {
                          setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
                        }} 
                      />
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">
                  No bookings match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExpandedDetailsPanel({ booking, onUpdate }: { booking: Booking; onUpdate: (b: Booking) => void }) {
  const [date, setDate] = useState(booking.consultation_date || "");
  const [time, setTime] = useState(booking.consultation_time || "");
  const [notes, setNotes] = useState(booking.admin_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = date !== (booking.consultation_date || "") || 
                     time !== (booking.consultation_time || "") || 
                     notes !== (booking.admin_notes || "");

  const handleSave = async (markScheduled: boolean = false) => {
    setIsSaving(true);
    try {
      const payload: any = { consultation_date: date || null, consultation_time: time || null, admin_notes: notes || null };
      if (markScheduled) {
        payload.status = "consultation_scheduled";
      }
      
      const response = await fetch("/api/admin/update-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id, details: payload }),
      });
      if (!response.ok) throw new Error("Failed to update details");
      const { booking: updatedBooking } = await response.json();
      onUpdate(updatedBooking);
      toast.success("Details updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Error updating details");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm relative">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-navy border-b pb-2">Scheduling Details</h4>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-navy focus:border-navy sm:text-sm p-2 border" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-navy focus:border-navy sm:text-sm p-2 border" />
          </div>
        </div>
        
        {booking.status === "pending_confirmation" && date && time && (
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded-md flex flex-col items-start gap-2">
            <p className="text-xs text-indigo-800 font-medium">Slot assigned. Ready to schedule?</p>
            <button disabled={isSaving} onClick={() => handleSave(true)} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-4 rounded shadow-sm transition-colors disabled:opacity-50">
              Save & Mark as Scheduled
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-navy border-b pb-2">Internal Admin Notes</h4>
        <textarea 
          rows={4} 
          value={notes} 
          onChange={e => setNotes(e.target.value)} 
          placeholder="e.g. Patient prefers morning appointments..."
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-navy focus:border-navy sm:text-sm resize-none p-2 border" 
        />
      </div>

      <div className="col-span-1 md:col-span-2 flex justify-end">
        <button 
          onClick={() => handleSave(false)} 
          disabled={!hasChanges || isSaving}
          className="bg-navy text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-navy/90 disabled:opacity-50 transition-colors"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
