"use client";

import { TreatmentEstimate } from "@/types/database";

export function EstimatesTable({ estimates }: { estimates: TreatmentEstimate[] }) {
  if (!estimates || estimates.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 border-t border-gray-200">
        No treatment estimate leads yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-t border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4 border-b border-gray-200">Name</th>
            <th className="px-6 py-4 border-b border-gray-200">Email</th>
            <th className="px-6 py-4 border-b border-gray-200">Treatment / Scope</th>
            <th className="px-6 py-4 border-b border-gray-200">Estimated Range</th>
            <th className="px-6 py-4 border-b border-gray-200 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {estimates.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-medium text-navy">{lead.first_name} {lead.last_name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {lead.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="block text-sm font-medium text-navy">{lead.treatment}</span>
                <span className="block text-xs text-gray-500">{lead.scope}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {lead.estimated_range}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {new Date(lead.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
