// src/components/dashboards/InstructorDashboard.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Progress, Modal } from '../ui';
import { DashboardLayout } from '../layout';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface InstructorDashboardProps {
  user?: User;
  onNavigate?: (href: string, id?: string) => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  notificationCount?: number;
}

// Mock data for instructor
const mockInstructorData = {
  totalCourses: 4,
  totalStudents: 156,
  pendingGrades: 23,
  todaysClasses: 2,
  assignedCourses: [
    {
      id: '1',
      code: 'CS301',
      name: 'Data Structures & Algorithms',
      semester: 'Spring 2024',
      students: 45,
      schedule: 'MWF 10:00-11:00 AM',
      room: 'Room 301',
      pendingGrades: 8,
      averageGrade: 'B+',
      attendance: 87
    },
    {
      id: '2',
      code: 'CS401',
      name: 'Software Engineering',
      semester: 'Spring 2024',
      students: 38,
      schedule: 'TTh 2:00-3:30 PM',
      room: 'Room 205',
      pendingGrades: 12,
      averageGrade: 'A-',
      attendance: 92
    },
    {
      id: '3',
      code: 'CS101',
      name: 'Introduction to Programming',
      semester: 'Spring 2024',
      students: 73,
      schedule: 'MWF 9:00-10:00 AM',
      room: 'Room 101',
      pendingGrades: 3,
      averageGrade: 'B',
      attendance: 85
    }
  ],
  todaysSchedule: [
    {
      id: '1',
      course: 'CS301',
      time: '10:00-11:00 AM',
      room: 'Room 301',
      topic: 'Binary Search Trees',
      students: 45
    },
    {
      id: '2',
      course: 'CS401',
      time: '2:00-3:30 PM',
      room: 'Room 205',
      topic: 'Agile Methodologies',
      students: 38
    }
  ],
  recentStudents: [
    {
      id: '1',
      name: 'Alice Johnson',
      studentId: 'ST2021001',
      course: 'CS301',
      email: 'alice.johnson@university.edu',
      attendance: 95,
      currentGrade: 'A',
      photo: null
    },
    {
      id: '2',
      name: 'Bob Smith',
      studentId: 'ST2021002',
      course: 'CS401',
      email: 'bob.smith@university.edu',
      attendance: 88,
      currentGrade: 'B+',
      photo: null
    },
    {
      id: '3',
      name: 'Carol Davis',
      studentId: 'ST2021003',
      course: 'CS101',
      email: 'carol.davis@university.edu',
      attendance: 92,
      currentGrade: 'A-',
      photo: null
    }
  ],
  pendingAssessments: [
    {
      id: '1',
      course: 'CS301',
      type: 'Assignment',
      title: 'Binary Tree Implementation',
      dueDate: '2024-02-20',
      submissions: 35,
      totalStudents: 45,
      status: 'Active'
    },
    {
      id: '2',
      course: 'CS401',
      type: 'Midterm',
      title: 'Software Design Patterns',
      dueDate: '2024-02-25',
      submissions: 0,
      totalStudents: 38,
      status: 'Scheduled'
    }
  ]
};

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
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
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'students' | 'assessments' | 'schedule'>('overview');
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const breadcrumbs = [
    { label: 'Instructor Dashboard', href: '/dashboard', isActive: true }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'info';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl md:text-2xl font-bold mb-2">
                Welcome, {user?.name}!
              </h1>
              <p className="text-primary-100 text-sm md:text-base">
                Computer Science Department • Spring 2024 Semester
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="secondary" size="sm" onClick={() => setShowAttendanceModal(true)} className="text-xs md:text-sm">
                Record Attendance
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowGradeModal(true)} className="text-xs md:text-sm">
                Enter Grades
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onNavigate?.('/announcements/create')} className="text-xs md:text-sm">
                Publish Announcement
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-blue-600 mb-1">Total Courses</p>
                  <p className="text-xl md:text-3xl font-bold text-blue-900">{mockInstructorData.totalCourses}</p>
                  <p className="text-xs text-blue-600 mt-1 hidden md:block">This semester</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-green-600 mb-1">Total Students</p>
                  <p className="text-xl md:text-3xl font-bold text-green-900">{mockInstructorData.totalStudents}</p>
                  <p className="text-xs text-green-600 mt-1 hidden md:block">Enrolled</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-orange-600 mb-1">Pending Grades</p>
                  <p className="text-xl md:text-3xl font-bold text-orange-900">{mockInstructorData.pendingGrades}</p>
                  <p className="text-xs text-orange-600 mt-1 hidden md:block">Need review</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8h6m-6 4h6" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-purple-600 mb-1">Today's Classes</p>
                  <p className="text-xl md:text-3xl font-bold text-purple-900">{mockInstructorData.todaysClasses}</p>
                  <p className="text-xs text-purple-600 mt-1 hidden md:block">Scheduled</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <nav className="flex overflow-x-auto space-x-4 md:space-x-8 px-4 md:px-6 scrollbar-hide" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'Courses' },
                { id: 'students', label: 'Students' },
                { id: 'assessments', label: 'Assessments' },
                { id: 'schedule', label: 'Schedule' }
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
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockInstructorData.todaysSchedule.map((class_) => (
                        <div key={class_.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-slate-900">{class_.course}</span>
                              <Badge variant="info" size="sm">{class_.time}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">{class_.topic}</p>
                            <p className="text-xs text-slate-500">
                              {class_.room} • {class_.students} students
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View Full Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Student Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Student Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockInstructorData.recentStudents.map((student) => (
                        <div key={student.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50">
                          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{student.name}</p>
                            <p className="text-sm text-slate-600">{student.course} • {student.studentId}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={getGradeColor(student.currentGrade) as any} size="sm">
                                {student.currentGrade}
                              </Badge>
                              <span className="text-xs text-slate-500">
                                {student.attendance}% attendance
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Students
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Assigned Courses</h3>
                  <Button onClick={() => onNavigate?.('/courses/content')}>
                    Manage Content
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockInstructorData.assignedCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-slate-900">{course.code}</h4>
                            <p className="text-sm text-slate-600 mt-1">{course.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{course.semester}</p>
                          </div>
                          {course.pendingGrades > 0 && (
                            <Badge variant="warning" size="sm">
                              {course.pendingGrades} pending
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-slate-900">{course.students}</p>
                            <p className="text-xs text-slate-600">Students</p>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <p className="text-2xl font-bold text-slate-900">{course.averageGrade}</p>
                            <p className="text-xs text-slate-600">Avg Grade</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600">Class Attendance</span>
                            <span className="font-medium">{course.attendance}%</span>
                          </div>
                          <Progress 
                            value={course.attendance} 
                            variant={course.attendance >= 80 ? 'success' : course.attendance >= 70 ? 'warning' : 'error'}
                            size="sm"
                          />
                        </div>
                        
                        <div className="space-y-2 text-sm text-slate-600 mb-4">
                          <p><span className="font-medium">Schedule:</span> {course.schedule}</p>
                          <p><span className="font-medium">Room:</span> {course.room}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="flex-1">
                            View Students
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            Manage Grades
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Student Management</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowAttendanceModal(true)}>
                      Record Attendance
                    </Button>
                    <Button onClick={() => setShowGradeModal(true)}>
                      Enter Grades
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>All Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Student</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Course</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Attendance</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Current Grade</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockInstructorData.recentStudents.map((student) => (
                            <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-slate-900">{student.name}</p>
                                    <p className="text-slate-600">{student.studentId}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-slate-600">{student.course}</td>
                              <td className="py-3 px-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-slate-900">{student.attendance}%</span>
                                  <div className="w-16">
                                    <Progress 
                                      value={student.attendance} 
                                      variant={student.attendance >= 75 ? 'success' : 'warning'}
                                      size="sm"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2">
                                <Badge variant={getGradeColor(student.currentGrade) as any} size="sm">
                                  {student.currentGrade}
                                </Badge>
                              </td>
                              <td className="py-3 px-2">
                                <div className="flex space-x-1">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Grade
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
              </div>
            )}

            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Assessment Management</h3>
                  <Button onClick={() => onNavigate?.('/assessments/create')}>
                    Create Assessment
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockInstructorData.pendingAssessments.map((assessment) => (
                    <Card key={assessment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-slate-900">{assessment.course}</h4>
                              <Badge variant="info" size="sm">{assessment.type}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">{assessment.title}</p>
                            <p className="text-xs text-slate-500 mt-1">Due: {assessment.dueDate}</p>
                          </div>
                          <Badge 
                            variant={assessment.status === 'Active' ? 'success' : 'warning'} 
                            size="sm"
                          >
                            {assessment.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-600">Submissions</span>
                            <span className="font-medium">
                              {assessment.submissions}/{assessment.totalStudents}
                            </span>
                          </div>
                          <Progress 
                            value={(assessment.submissions / assessment.totalStudents) * 100} 
                            variant="default"
                            size="sm"
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="flex-1">
                            View Submissions
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            Grade
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Class Schedule</h3>
                  <Button onClick={() => onNavigate?.('/schedule/create')}>
                    Schedule Class
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-4 mb-4">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center font-medium text-slate-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4">
                      {/* Sample schedule blocks */}
                      <div className="col-start-1 row-start-1">
                        <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 text-xs">
                          <p className="font-medium text-blue-900">CS301</p>
                          <p className="text-blue-700">10:00-11:00</p>
                          <p className="text-blue-600">Room 301</p>
                        </div>
                      </div>
                      
                      <div className="col-start-3 row-start-1">
                        <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 text-xs">
                          <p className="font-medium text-blue-900">CS301</p>
                          <p className="text-blue-700">10:00-11:00</p>
                          <p className="text-blue-600">Room 301</p>
                        </div>
                      </div>
                      
                      <div className="col-start-5 row-start-1">
                        <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 text-xs">
                          <p className="font-medium text-blue-900">CS301</p>
                          <p className="text-blue-700">10:00-11:00</p>
                          <p className="text-blue-600">Room 301</p>
                        </div>
                      </div>
                      
                      <div className="col-start-2 row-start-2">
                        <div className="bg-green-100 border border-green-200 rounded-lg p-2 text-xs">
                          <p className="font-medium text-green-900">CS401</p>
                          <p className="text-green-700">2:00-3:30</p>
                          <p className="text-green-600">Room 205</p>
                        </div>
                      </div>
                      
                      <div className="col-start-4 row-start-2">
                        <div className="bg-green-100 border border-green-200 rounded-lg p-2 text-xs">
                          <p className="font-medium text-green-900">CS401</p>
                          <p className="text-green-700">2:00-3:30</p>
                          <p className="text-green-600">Room 205</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grade Entry Modal */}
      <Modal
        isOpen={showGradeModal}
        onClose={() => setShowGradeModal(false)}
        title="Enter Grades"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Course
            </label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option>CS301 - Data Structures & Algorithms</option>
              <option>CS401 - Software Engineering</option>
              <option>CS101 - Introduction to Programming</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Assessment Type
            </label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option>Assignment</option>
              <option>Quiz</option>
              <option>Midterm</option>
              <option>Final</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowGradeModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowGradeModal(false)}>
              Continue to Grade Entry
            </Button>
          </div>
        </div>
      </Modal>

      {/* Attendance Modal */}
      <Modal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        title="Record Attendance"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Course
            </label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2">
              <option>CS301 - Data Structures & Algorithms</option>
              <option>CS401 - Software Engineering</option>
              <option>CS101 - Introduction to Programming</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Class Date
            </label>
            <input 
              type="date" 
              className="w-full border border-slate-300 rounded-lg px-3 py-2"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAttendanceModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAttendanceModal(false)}>
              Continue to Attendance
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default InstructorDashboard;