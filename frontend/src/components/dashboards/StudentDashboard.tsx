// src/components/dashboards/StudentDashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Progress, CircularProgress } from '../ui';
import { DashboardLayout } from '../layout';
import { User, Course, Grade, Attendance } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, AlertCircle, Clock } from 'lucide-react';

interface StudentDashboardProps {
  user?: User;
  onNavigate?: (href: string, id?: string) => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  notificationCount?: number;
}

// Mock data - in real app, this would come from API
const mockStudentData = {
  gpa: 3.75,
  cgpa: 3.68,
  totalCredits: 84,
  currentSemesterCourses: 6,
  upcomingExams: 3,
  overallAttendance: 87,
  outstandingFees: 2500,
  enrolledCourses: [
    {
      id: '1',
      code: 'CS301',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Johnson',
      credits: 4,
      status: 'Active' as const,
      grade: 'A-',
      attendance: 92
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Calculus II',
      instructor: 'Prof. Michael Chen',
      credits: 3,
      status: 'Active' as const,
      grade: 'B+',
      attendance: 85
    },
    {
      id: '3',
      code: 'ENG102',
      name: 'Technical Writing',
      instructor: 'Dr. Emily Davis',
      credits: 2,
      status: 'Active' as const,
      grade: 'A',
      attendance: 90
    }
  ],
  upcomingExamsList: [
    {
      id: '1',
      course: 'CS301',
      name: 'Midterm Exam',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Room 301',
      type: 'Midterm' as const
    },
    {
      id: '2',
      course: 'MATH201',
      name: 'Quiz 3',
      date: '2024-02-18',
      time: '2:00 PM',
      location: 'Room 205',
      type: 'Quiz' as const
    }
  ],
  notifications: [
    {
      id: '1',
      type: 'Academic' as const,
      title: 'New assignment posted in CS301',
      message: 'Assignment 3: Binary Trees due next Friday',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      type: 'Finance' as const,
      title: 'Fee payment reminder',
      message: 'Semester fee payment due in 5 days',
      timestamp: '1 day ago',
      isRead: false
    }
  ]
};

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user: propUser,
  onNavigate,
  onSearch,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  notificationCount = 0
}) => {
  const { user: contextUser } = useAuth();
  const navigate = useNavigate();
  const user = propUser || contextUser;
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'grades' | 'attendance' | 'finance'>('overview');
  
  // Navigation handler that uses React Router
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard', isActive: true }
  ];

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'Academic': return 'info';
      case 'Finance': return 'warning';
      case 'Exam': return 'error';
      default: return 'default';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'Final': return 'error';
      case 'Midterm': return 'warning';
      case 'Quiz': return 'info';
      default: return 'default';
    }
  };

  const getDaysUntilExam = (dateString: string) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout
      activeSection="dashboard"
      breadcrumbs={breadcrumbs}
      onSearch={onSearch}
      onNavigate={onNavigate}
      onNotificationClick={onNotificationClick}
      onProfileClick={onProfileClick}
      onSettingsClick={onSettingsClick}
      onLogout={onLogout}
      notificationCount={notificationCount}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 md:p-6 text-white">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-primary-100 text-sm md:text-base">
                Student ID: {user?.id} • Current Semester: Spring 2024
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications Bell */}
              <div className="relative">
                <Button variant="secondary" size="sm" className="relative">
                  <Bell className="w-4 h-4 md:w-5 md:h-5" />
                  <Badge variant="error" size="sm" className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                    4
                  </Badge>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => onNavigate?.('/courses')} className="text-xs md:text-sm">
                  My Courses
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onNavigate?.('/finance/fees')} className="text-xs md:text-sm">
                  Pay Fees
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleNavigate('/dashboard/student/timetable')} className="text-xs md:text-sm">
                  View Timetable
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleNavigate('/dashboard/student/grades')} className="text-xs md:text-sm">
                  Transcript
                </Button>
              </div>
            </div>
          </div>
          
          {/* Important Alerts */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-800">Payment due: Tuition fee payment is due in 3 days</span>
              <Badge variant="error" size="sm">Urgent</Badge>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-sm text-amber-800">Exam reminder: Mathematics final exam in 5 days</span>
              <Badge variant="warning" size="sm">Reminder</Badge>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-xs md:text-sm font-medium text-blue-600 mb-1">Current GPA</p>
                  <p className="text-xl md:text-3xl font-bold text-blue-900">{mockStudentData.gpa}</p>
                  <p className="text-xs text-blue-600 mt-1">CGPA: {mockStudentData.cgpa}</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center self-end md:self-auto">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Credits Completed</p>
                  <p className="text-3xl font-bold text-green-900">{mockStudentData.totalCredits}</p>
                  <p className="text-xs text-green-600 mt-1">of 120 required</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Current Courses</p>
                  <p className="text-3xl font-bold text-purple-900">{mockStudentData.currentSemesterCourses}</p>
                  <p className="text-xs text-purple-600 mt-1">This semester</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Upcoming Exams</p>
                  <p className="text-3xl font-bold text-orange-900">{mockStudentData.upcomingExams}</p>
                  <p className="text-xs text-orange-600 mt-1">Next 2 weeks</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg border border-slate-200">
          {/* Tab Navigation */}
          <div className="border-b border-slate-200">
            <nav className="flex overflow-x-auto px-4 md:px-6" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'My Courses' },
                { id: 'grades', label: 'Grades' },
                { id: 'attendance', label: 'Attendance' },
                { id: 'finance', label: 'Finance' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'py-4 px-2 md:px-4 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  )}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockStudentData.notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                          <Badge variant={getNotificationTypeColor(notification.type) as any} size="sm">
                            {notification.type}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notification.timestamp}</p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Exams */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockStudentData.upcomingExamsList.map((exam) => {
                        const daysUntil = getDaysUntilExam(exam.date);
                        return (
                          <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-slate-900">{exam.course}</span>
                                <Badge variant={getExamTypeColor(exam.type) as any} size="sm">
                                  {exam.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600">{exam.name}</p>
                              <p className="text-xs text-slate-500">
                                {exam.date} at {exam.time} • {exam.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                'text-sm font-medium',
                                daysUntil <= 3 ? 'text-red-600' : daysUntil <= 7 ? 'text-orange-600' : 'text-slate-600'
                              )}>
                                {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View Full Exam Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-slate-900">Enrolled Courses</h3>
                    <Badge variant="info" size="sm">3 pending assignments</Badge>
                  </div>
                  <Button onClick={() => onNavigate?.('/courses/registration')}>
                    Course Registration
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockStudentData.enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center relative">
                              <span className="text-blue-600 font-semibold text-sm">{course.code.substring(0, 3)}</span>
                              {course.code === 'CS301' && (
                                <Badge variant="error" size="sm" className="absolute -top-1 -right-1 min-w-[1rem] h-4 flex items-center justify-center text-xs">
                                  2
                                </Badge>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-slate-900">{course.code}</h4>
                                {course.code === 'MATH201' && (
                                  <Badge variant="warning" size="sm">Assignment Due</Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mt-1">{course.name}</p>
                            </div>
                          </div>
                          <Badge variant={course.status === 'Active' ? 'success' : 'default'} size="sm">
                            {course.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-slate-600">
                          <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                          <p><span className="font-medium">Credits:</span> {course.credits}</p>
                          <p><span className="font-medium">Current Grade:</span> {course.grade}</p>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600">Attendance</span>
                            <span className="font-medium">{course.attendance}%</span>
                          </div>
                          <Progress 
                            value={course.attendance} 
                            variant={course.attendance >= 75 ? 'success' : course.attendance >= 60 ? 'warning' : 'error'}
                            size="sm"
                          />
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="flex-1">
                              View Details
                            </Button>
                            {course.code === 'CS301' && (
                              <Button variant="primary" size="sm" className="flex-1">
                                View Assignments
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Academic Performance</h3>
                  <Button onClick={() => handleNavigate('/dashboard/student/grades')}>
                    Download Transcript
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Semester Grades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-2 font-medium text-slate-600">Course</th>
                                <th className="text-left py-3 px-2 font-medium text-slate-600">Credits</th>
                                <th className="text-left py-3 px-2 font-medium text-slate-600">Grade</th>
                                <th className="text-left py-3 px-2 font-medium text-slate-600">Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockStudentData.enrolledCourses.map((course) => (
                                <tr key={course.id} className="border-b border-slate-100">
                                  <td className="py-3 px-2">
                                    <div>
                                      <p className="font-medium text-slate-900">{course.code}</p>
                                      <p className="text-slate-600">{course.name}</p>
                                    </div>
                                  </td>
                                  <td className="py-3 px-2 text-slate-600">{course.credits}</td>
                                  <td className="py-3 px-2">
                                    <Badge variant="success" size="sm">{course.grade}</Badge>
                                  </td>
                                  <td className="py-3 px-2 text-slate-600">
                                    {course.grade === 'A' ? '4.0' : course.grade === 'A-' ? '3.7' : course.grade === 'B+' ? '3.3' : '3.0'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>GPA Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="text-center">
                            <CircularProgress 
                              value={mockStudentData.gpa} 
                              max={4.0} 
                              size={120}
                              variant="success"
                              showLabel
                              label="Current GPA"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Current GPA</span>
                              <span className="font-medium">{mockStudentData.gpa}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Cumulative GPA</span>
                              <span className="font-medium">{mockStudentData.cgpa}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Credits Completed</span>
                              <span className="font-medium">{mockStudentData.totalCredits}/120</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Academic Standing</span>
                              <Badge variant="success" size="sm">Good Standing</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Attendance Overview</h3>
                  <div className="text-sm text-slate-600">
                    Overall Attendance: <span className="font-medium text-slate-900">{mockStudentData.overallAttendance}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-6">
                        <CircularProgress 
                          value={mockStudentData.overallAttendance} 
                          size={150}
                          variant={mockStudentData.overallAttendance >= 75 ? 'success' : 'warning'}
                          showLabel
                          label="Attendance"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Classes Attended</span>
                          <span className="font-medium">78/90</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Classes Missed</span>
                          <span className="font-medium text-red-600">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Minimum Required</span>
                          <span className="font-medium">75%</span>
                        </div>
                      </div>
                      
                      {mockStudentData.overallAttendance < 75 && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            ⚠️ Your attendance is below the minimum requirement of 75%.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course-wise Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockStudentData.enrolledCourses.map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-slate-900">{course.code}</p>
                                <p className="text-sm text-slate-600">{course.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{course.attendance}%</p>
                                <Badge 
                                  variant={course.attendance >= 75 ? 'success' : course.attendance >= 60 ? 'warning' : 'error'} 
                                  size="sm"
                                >
                                  {course.attendance >= 75 ? 'Good' : course.attendance >= 60 ? 'Warning' : 'Critical'}
                                </Badge>
                              </div>
                            </div>
                            <Progress 
                              value={course.attendance} 
                              variant={course.attendance >= 75 ? 'success' : course.attendance >= 60 ? 'warning' : 'error'}
                              size="sm"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-slate-900">Financial Overview</h3>
                    <Badge variant="error" size="sm">Payment Due</Badge>
                  </div>
                  <Button onClick={() => handleNavigate('/dashboard/student/finance')} className="relative">
                    Make Payment
                    <Badge variant="error" size="sm" className="absolute -top-1 -right-1 min-w-[1rem] h-4 flex items-center justify-center text-xs">
                      !
                    </Badge>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fee Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg relative">
                          <Badge variant="error" size="sm" className="absolute top-2 right-2">Urgent</Badge>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-red-900">Outstanding Balance</span>
                            <span className="text-xl font-bold text-red-900">${mockStudentData.outstandingFees}</span>
                          </div>
                          <p className="text-sm text-red-700">Due Date: March 15, 2024</p>
                          <p className="text-xs text-red-600 mt-1">Due in 3 days</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-600">Tuition Fee</span>
                            <span className="font-medium">$2,000</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-600">Lab Fee</span>
                            <span className="font-medium">$300</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-600">Library Fee</span>
                            <span className="font-medium">$100</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-600">Late Fee</span>
                            <span className="font-medium text-red-600">$100</span>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-200">
                          <Button className="w-full">
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { date: '2024-01-15', amount: 2500, method: 'Credit Card', status: 'Completed' },
                          { date: '2023-12-15', amount: 2500, method: 'Bank Transfer', status: 'Completed' },
                          { date: '2023-11-15', amount: 2500, method: 'Credit Card', status: 'Completed' }
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">${payment.amount}</p>
                              <p className="text-sm text-slate-600">{payment.date}</p>
                              <p className="text-xs text-slate-500">{payment.method}</p>
                            </div>
                            <Badge variant="success" size="sm">
                              {payment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="w-full">
                          View All Payments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;