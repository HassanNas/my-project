
export enum Language {
  EN = 'en',
  AR = 'ar',
}

export interface Patient {
  id: string;
  name: string;
  dob: string; // YYYY-MM-DD
  phone: string;
  email: string;
  address: string;
  medicalHistory: string; // Simple text for now
  dentalHistory: string; // Simple text for now
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  notes?: string;
  createdAt: string; // ISO date string
}

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  CONFIRMED = 'Confirmed',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No Show',
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string; // Denormalized for easier display
  staffId: string;
  staffName?: string; // Denormalized
  service: string;
  dateTime: string; // ISO date string
  durationMinutes: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string; // ISO date string
}

export enum StaffRole {
  DENTIST = 'Dentist',
  HYGIENIST = 'Hygienist',
  ASSISTANT = 'Dental Assistant',
  RECEPTIONIST = 'Receptionist',
  ADMIN = 'Administrator',
}

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  email: string;
  phone: string;
  specialization?: string; // For dentists/hygienists
  createdAt: string; // ISO date string
}

export enum BillStatus {
  UNPAID = 'Unpaid',
  PARTIALLY_PAID = 'Partially Paid',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
}

export interface Bill {
  id: string;
  patientId: string;
  patientName?: string;
  appointmentId?: string;
  serviceDetails: string;
  amount: number;
  amountPaid: number;
  status: BillStatus;
  dueDate: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string; // e.g., 'pcs', 'box', 'ml'
  reorderLevel: number;
  supplier?: string;
  lastOrderedDate?: string; // ISO date string
  expiryDate?: string; // ISO date string
  createdAt: string; // ISO date string
}

export type AppSection = 
  | 'dashboard' 
  | 'patients' 
  | 'appointments' 
  | 'staff' 
  | 'billing' 
  | 'inventory' 
  | 'reports'
  | 'settings';

export interface LocalizedStrings {
  [key: string]: string | LocalizedStrings;
}
