"use client";

import { useState } from "react";
import { Booking } from "@/types/database";
import { format } from "date-fns";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function BookingsTable({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
  const [refundingId, setRefundingId] = useState<string | null>(null);
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
      
      // Update local state to reflect the refund immediately
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deposit_held":
      case "pending": // Map pending to deposit_held visually as well
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Deposit Held
          </span>
        );
      case "refunded":
      case "cancelled": // Map cancelled to refunded
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Refunded
          </span>
        );
      case "forfeited":
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Forfeited
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
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
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
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
                {getStatusBadge(booking.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {(booking.status === "deposit_held" || booking.status === "pending") && (
                  <button
                    onClick={() => handleRefund(booking.id, booking.stripe_payment_intent_id)}
                    disabled={refundingId === booking.id}
                    className="inline-flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {refundingId === booking.id ? (
                      <RefreshCcw className="w-4 h-4 mr-1.5 animate-spin" />
                    ) : (
                      <RefreshCcw className="w-4 h-4 mr-1.5" />
                    )}
                    Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
