export type AvailabilityStatus = "fully_booked" | "limited" | "high";

export interface DayAvailability {
  day: string;
  status: AvailabilityStatus;
  slotsRemaining?: number;
}

export const availabilityConfig = {
  // General messaging
  demandMessage: "High demand this month",
  bannerMessage: "Only 2 consultation slots remaining this week.",
  
  // Schedule to display
  schedule: [
    {
      day: "Tuesday",
      status: "fully_booked",
    },
    {
      day: "Wednesday",
      status: "limited",
      slotsRemaining: 1,
    },
    {
      day: "Thursday",
      status: "limited",
      slotsRemaining: 1,
    },
    {
      day: "Friday",
      status: "high",
      slotsRemaining: 4,
    },
  ] as DayAvailability[],

  // Reassurance bullet points
  motivationPoints: [
    "Priority access to specialist appointments",
    "Dedicated personal treatment coordinator",
    "Fully refundable £50 consultation deposit",
    "Comprehensive personal treatment assessment",
  ],
};
