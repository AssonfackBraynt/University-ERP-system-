// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { 
  LandingPage, 
  LoginPage, 
  ProgramsPage, 
  ContactPage,
  ProtectedRoute,
  StudentDashboard, 
  InstructorDashboard, 
  AdminDashboard 
} from './components';
import { UserRole } from './types';

// Import student pages
import MyCourses from './pages/student/MyCourses';
import EnrolledCourses from './pages/student/EnrolledCourses';
import CourseRegistration from './pages/student/CourseRegistration';
import Timetable from './pages/student/Timetable';
import Grades from './pages/student/Grades';
import CurrentGrades from './pages/student/CurrentGrades';
import Transcripts from './pages/student/Transcripts';
import Attendance from './pages/student/Attendance';
import Exams from './pages/student/Exams';
import Finance from './pages/student/Finance';

import './App.css';
import './styles/design-system.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Page Routes */}
            <Route 
              path="/dashboard/student/courses" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <MyCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/courses/enrolled" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <EnrolledCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/courses/registration" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <CourseRegistration />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/timetable" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Timetable />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/grades" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Grades />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/grades/current" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <CurrentGrades />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/grades/transcripts" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Transcripts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/attendance" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Attendance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/exams" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Exams />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student/finance" 
              element={
                <ProtectedRoute requiredRole={UserRole.STUDENT}>
                  <Finance />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/instructor" 
              element={
                <ProtectedRoute requiredRole={UserRole.INSTRUCTOR}>
                  <InstructorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;