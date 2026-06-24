/**
 * Centralized analytics tracking utility.
 * Logs events to console in development and prepares the payload for GA4.
 */

type EventName = 
  | "whatsapp_click"
  | "assistance_widget_view"
  | "assistance_widget_dismiss"
  | "assistance_widget_click"
  | "treatment_whatsapp_click"
  | "contact_option_click"
  | "availability_section_viewed"
  | "availability_booking_click"
  | "calculator_started"
  | "calculator_completed"
  | "calculator_consultation_booked";

export const trackEvent = (eventName: EventName, params?: Record<string, any>) => {
  // Console logging for development verification
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics Event]: ${eventName}`, params || {});
  }

  // GA4 integration hook
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
};
