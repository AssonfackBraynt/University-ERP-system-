// src/types/index.ts

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
  studentId?: string;
  employeeId?: string;
  avatar?: string;
  mfaEnabled?: boolean;
  permissions?: string[];
}

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  STAFF = 'staff'
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Program Types
export interface Program {
  id: string;
  title: string;
  description: string;
  department: string;
  duration: number; // in months
  credits: number;
  isActive: boolean;
}

// Course Types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  programId: string;
  instructorId: string;
  semester: string;
  year: number;
}

// Academic Types
export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  grade: string;
  points: number;
  semester: string;
  year: number;
  createdAt: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: Date;
  status: AttendanceStatus;
  remarks?: string;
}

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused'
}

// Finance Types
export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  dueDate: Date;
  status: InvoiceStatus;
  description: string;
  semester: string;
  year: number;
  createdAt: Date;
}

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  paidAt: Date;
  status: PaymentStatus;
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  CHECK = 'check'
}

export enum PaymentStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
  REFUNDED = 'refunded'
}

// HR Types
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: Date;
  isActive: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  createdAt: Date;
}

export enum LeaveType {
  ANNUAL = 'annual',
  SICK = 'sick',
  MATERNITY = 'maternity',
  PATERNITY = 'paternity',
  EMERGENCY = 'emergency'
}

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}