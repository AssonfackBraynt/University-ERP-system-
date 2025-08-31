// src/components/dashboards/AdminDashboard.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Progress, Modal } from '../ui';
import { DashboardLayout } from '../layout';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface AdminDashboardProps {
  user?: User;
  onNavigate?: (href: string, id?: string) => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  notificationCount?: number;
}

// Mock data for administrator
const mockAdminData = {
  systemMetrics: {
    activeUsers: {
      students: 2847,
      instructors: 156,
      staff: 89,
      total: 3092
    },
    courses: {
      active: 234,
      total: 456
    },
    attendance: {
      rate: 87.5,
      trend: '+2.3%'
    },
    exams: {
      scheduled: 45,
      completed: 123
    },
    finance: {
      collected: 2450000,
      outstanding: 340000,
      percentage: 87.8
    },
    systemHealth: {
      status: 'Healthy',
      uptime: '99.9%',
      lastBackup: '2024-02-15 03:00 AM'
    }
  },
  recentActivities: [
    {
      id: '1',
      type: 'user_registration',
      description: '15 new students registered',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'course_creation',
      description: 'CS402 - Machine Learning created',
      timestamp: '4 hours ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'exam_scheduled',
      description: 'Midterm exams scheduled for March',
      timestamp: '6 hours ago',
      status: 'info'
    },
    {
      id: '4',
      type: 'system_alert',
      description: 'Database backup completed successfully',
      timestamp: '8 hours ago',
      status: 'success'
    }
  ],
  departments: [
    {
      id: '1',
      name: 'Computer Science',
      code: 'CS',
      students: 456,
      instructors: 23,
      courses: 45,
      head: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      name: 'Mathematics',
      code: 'MATH',
      students: 234,
      instructors: 18,
      courses: 32,
      head: 'Dr. Michael Brown'
    },
    {
      id: '3',
      name: 'Physics',
      code: 'PHYS',
      students: 189,
      instructors: 15,
      courses: 28,
      head: 'Dr. Emily Davis'
    }
  ],
  pendingApprovals: [
    {
      id: '1',
      type: 'Course Registration',
      description: 'CS501 - Advanced Algorithms',
      requestedBy: 'Dr. John Smith',
      date: '2024-02-15',
      priority: 'high'
    },
    {
      id: '2',
      type: 'Grade Publication',
      description: 'CS301 Midterm Results',
      requestedBy: 'Dr. Alice Wilson',
      date: '2024-02-14',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'Room Booking',
      description: 'Auditorium for Graduation Ceremony',
      requestedBy: 'Events Committee',
      date: '2024-02-13',
      priority: 'low'
    }
  ],
  systemAlerts: [
    {
      id: '1',
      type: 'warning',
      message: 'Server storage at 85% capacity',
      timestamp: '1 hour ago'
    },
    {
      id: '2',
      type: 'info',
      message: 'Scheduled maintenance on Sunday 2 AM',
      timestamp: '3 hours ago'
    }
  ]
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({
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
  const user = propUser || contextUser;
  
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'users' | 'reports' | 'system'>('overview');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showScheduleExamModal, setShowScheduleExamModal] = useState(false);

  const breadcrumbs = [
    { label: 'Administrator Dashboard', href: '/admin/dashboard', isActive: true }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'course_creation':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'exam_scheduled':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
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
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                <h1 className="text-xl md:text-2xl font-bold mb-1 sm:mb-0">
                  Welcome, {user?.name}!
                </h1>
                <Badge variant="outline" className="bg-white/20 text-white border-white/30 self-start">
                  Administrator
                </Badge>
              </div>
              <p className="text-primary-100 text-sm md:text-base">
                System Administration • University ERP Management
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowCreateUserModal(true)} className="text-xs md:text-sm">
                Create User
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowCreateCourseModal(true)} className="text-xs md:text-sm">
                Create Course
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowScheduleExamModal(true)} className="text-xs md:text-sm">
                Schedule Exam
              </Button>
            </div>
          </div>
        </div>

        {/* System Overview KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-blue-600 mb-1">Active Users</p>
                  <p className="text-xl md:text-3xl font-bold text-blue-900">{mockAdminData.systemMetrics.activeUsers.total.toLocaleString()}</p>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mt-2">
                    <span className="text-xs text-blue-600">{mockAdminData.systemMetrics.activeUsers.students} Students</span>
                    <span className="text-xs text-blue-500 hidden md:inline">•</span>
                    <span className="text-xs text-blue-600">{mockAdminData.systemMetrics.activeUsers.instructors} Faculty</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-green-600 mb-1">Active Courses</p>
                  <p className="text-xl md:text-3xl font-bold text-green-900">{mockAdminData.systemMetrics.courses.active}</p>
                  <p className="text-xs text-green-600 mt-1 hidden md:block">Current semester</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-purple-600 mb-1">Attendance Rate</p>
                  <p className="text-xl md:text-3xl font-bold text-purple-900">{mockAdminData.systemMetrics.attendance.rate}%</p>
                  <p className="text-xs text-purple-600 mt-1 hidden md:block">{mockAdminData.systemMetrics.attendance.trend} this month</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-orange-600 mb-1">Fee Collection</p>
                  <p className="text-xl md:text-3xl font-bold text-orange-900">{mockAdminData.systemMetrics.finance.percentage}%</p>
                  <p className="text-xs text-orange-600 mt-1 hidden md:block">${mockAdminData.systemMetrics.finance.collected.toLocaleString()} collected</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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
            <nav className="flex overflow-x-auto space-x-4 md:space-x-8 px-4 md:px-6 scrollbar-hide" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'academic', label: 'Academic' },
                { id: 'users', label: 'Users' },
                { id: 'reports', label: 'Reports' },
                { id: 'system', label: 'System' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'py-3 md:py-4 px-1 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent System Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAdminData.recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center',
                            activity.status === 'success' ? 'bg-green-100 text-green-600' :
                            activity.status === 'info' ? 'bg-blue-100 text-blue-600' :
                            'bg-orange-100 text-orange-600'
                          )}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{activity.description}</p>
                            <p className="text-xs text-slate-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Activities
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAdminData.pendingApprovals.map((approval) => (
                        <div key={approval.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-slate-900">{approval.type}</span>
                              <Badge variant={getPriorityColor(approval.priority) as any} size="sm">
                                {approval.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">{approval.description}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Requested by {approval.requestedBy} • {approval.date}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Approvals
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAdminData.systemAlerts.map((alert) => (
                        <div key={alert.id} className={cn(
                          'flex items-center space-x-3 p-3 rounded-lg',
                          alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                          'bg-blue-50 border border-blue-200'
                        )}>
                          <div className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center',
                            alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                          )}>
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className={cn(
                              'text-sm font-medium',
                              alert.type === 'warning' ? 'text-orange-900' : 'text-blue-900'
                            )}>
                              {alert.message}
                            </p>
                            <p className={cn(
                              'text-xs',
                              alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                            )}>
                              {alert.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Academic Management</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => onNavigate?.('/admin/programs')}>
                      Manage Programs
                    </Button>
                    <Button onClick={() => setShowCreateCourseModal(true)}>
                      Create Course
                    </Button>
                  </div>
                </div>
                
                {/* Departments Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Departments Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Department</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Head</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Students</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Instructors</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Courses</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockAdminData.departments.map((dept) => (
                            <tr key={dept.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-2">
                                <div>
                                  <p className="font-medium text-slate-900">{dept.name}</p>
                                  <p className="text-slate-600">{dept.code}</p>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-slate-600">{dept.head}</td>
                              <td className="py-3 px-2 text-slate-900 font-medium">{dept.students}</td>
                              <td className="py-3 px-2 text-slate-900 font-medium">{dept.instructors}</td>
                              <td className="py-3 px-2 text-slate-900 font-medium">{dept.courses}</td>
                              <td className="py-3 px-2">
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Course & Program Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">Active Courses</p>
                            <p className="text-2xl font-bold text-primary-600">{mockAdminData.systemMetrics.courses.active}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Create New Course
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Assign Instructors
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Manage Prerequisites
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Examination Administration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-slate-900">{mockAdminData.systemMetrics.exams.scheduled}</p>
                            <p className="text-xs text-slate-600">Scheduled</p>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-slate-900">{mockAdminData.systemMetrics.exams.completed}</p>
                            <p className="text-xs text-slate-600">Completed</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Schedule Exams
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Assign Invigilators
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Manage Exam Rooms
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">User & Access Management</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => onNavigate?.('/admin/roles')}>
                      Manage Roles
                    </Button>
                    <Button onClick={() => setShowCreateUserModal(true)}>
                      Create User
                    </Button>
                  </div>
                </div>
                
                {/* User Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-blue-900">{mockAdminData.systemMetrics.activeUsers.students.toLocaleString()}</p>
                      <p className="text-sm font-medium text-blue-600">Students</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-green-900">{mockAdminData.systemMetrics.activeUsers.instructors}</p>
                      <p className="text-sm font-medium text-green-600">Instructors</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <p className="text-3xl font-bold text-purple-900">{mockAdminData.systemMetrics.activeUsers.staff}</p>
                      <p className="text-sm font-medium text-purple-600">Staff</p>
                    </CardContent>
                  </Card>
                </div>

                {/* User Management Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>User Management Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span className="text-sm font-medium">Register New User</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-sm font-medium">Role Management</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium">Bulk Import</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span className="text-sm font-medium">Reset Passwords</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6" />
                        </svg>
                        <span className="text-sm font-medium">Generate Reports</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">System Settings</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Reports & Analytics</h3>
                  <Button onClick={() => onNavigate?.('/admin/reports/generate')}>
                    Generate Custom Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Academic Reports', description: 'Grade distributions, performance analytics', icon: '📊' },
                    { title: 'Attendance Reports', description: 'Student and faculty attendance patterns', icon: '📅' },
                    { title: 'Financial Reports', description: 'Fee collection, outstanding payments', icon: '💰' },
                    { title: 'User Activity Reports', description: 'System usage and engagement metrics', icon: '👥' },
                    { title: 'Course Analytics', description: 'Enrollment trends, course performance', icon: '📚' },
                    { title: 'System Performance', description: 'Technical metrics and health reports', icon: '⚡' }
                  ].map((report, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="text-4xl mb-3">{report.icon}</div>
                          <h4 className="font-semibold text-slate-900 mb-2">{report.title}</h4>
                          <p className="text-sm text-slate-600 mb-4">{report.description}</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">System Health & Monitoring</h3>
                  <Button variant="outline" onClick={() => onNavigate?.('/admin/system/settings')}>
                    System Settings
                  </Button>
                </div>
                
                {/* System Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold text-green-900">{mockAdminData.systemMetrics.systemHealth.status}</p>
                      <p className="text-sm font-medium text-green-600">System Status</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{mockAdminData.systemMetrics.systemHealth.uptime}</p>
                      <p className="text-sm font-medium text-blue-600">Uptime</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold text-purple-900">Latest</p>
                      <p className="text-sm font-medium text-purple-600">Last Backup</p>
                      <p className="text-xs text-purple-500 mt-1">{mockAdminData.systemMetrics.systemHealth.lastBackup}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* System Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Administration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                        <span className="text-sm font-medium">Database Backup</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">System Settings</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="text-sm font-medium">Performance Monitor</span>
                      </Button>
                      
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-sm font-medium">System Logs</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        title="Create New User"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Course
              </label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
                <option>CS301 - Data Structures & Algorithms</option>
                <option>CS401 - Software Engineering</option>
                <option>MATH201 - Calculus II</option>
                <option>PHYS101 - General Physics</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Exam Type
              </label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
                <option>Assignment</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Exam Date
              </label>
              <input 
                type="date" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Exam Time
              </label>
              <input 
                type="time" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Duration (minutes)
              </label>
              <input 
                type="number" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="120"
                min="30"
                max="300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Room/Location
              </label>
              <input 
                type="text" 
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                placeholder="Room 301"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Instructions
            </label>
            <textarea 
              className="w-full border border-slate-300 rounded-lg px-3 py-2 h-24 resize-none"
              placeholder="Special instructions for the exam..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowScheduleExamModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowScheduleExamModal(false)}>
              Schedule Exam
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminDashboard;