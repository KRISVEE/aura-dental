export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type TreatmentType = 
  | "implants" 
  | "veneers" 
  | "invisalign" 
  | "makeover" 
  | "general";

export type TimePreference = 
  | "morning" 
  | "afternoon" 
  | "evening" 
  | "anytime";

export interface PatientDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}

export interface BookingState {
  treatment: TreatmentType | null;
  preferredTime: TimePreference | null;
  patientDetails: PatientDetails | null;
}
