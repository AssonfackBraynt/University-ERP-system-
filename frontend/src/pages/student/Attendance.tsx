import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
// Select, Tabs, and Alert components not available - using simple state management instead
import { Progress } from '../../components/ui/Progress';
import { DashboardLayout } from '../../components/layout';

interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'Good' | 'Warning' | 'Critical';
  lastAttended: string;
  instructor: string;
}

interface DailyAttendance {
  date: string;
  courses: {
    courseCode: string;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
    time: string;
    room: string;
  }[];
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    totalClasses: 45,
    attendedClasses: 42,
    percentage: 93.3,
    status: 'Good',
    lastAttended: '2024-01-15',
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    totalClasses: 40,
    attendedClasses: 32,
    percentage: 80.0,
    status: 'Good',
    lastAttended: '2024-01-14',
    instructor: 'Prof. Michael Chen'
  },
  {
    id: '3',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    totalClasses: 30,
    attendedClasses: 22,
    percentage: 73.3,
    status: 'Warning',
    lastAttended: '2024-01-12',
    instructor: 'Dr. Emily Rodriguez'
  },
  {
    id: '4',
    courseCode: 'PHY101',
    courseName: 'Physics I',
    totalClasses: 35,
    attendedClasses: 20,
    percentage: 57.1,
    status: 'Critical',
    lastAttended: '2024-01-10',
    instructor: 'Dr. James Miller'
  }
];

const mockDailyAttendance: DailyAttendance[] = [
  {
    date: '2024-01-15',
    courses: [
      { courseCode: 'CS101', status: 'Present', time: '10:00 AM', room: 'Room 201' },
      { courseCode: 'ENG102', status: 'Present', time: '1:00 PM', room: 'Room 301' }
    ]
  },
  {
    date: '2024-01-14',
    courses: [
      { courseCode: 'MATH201', status: 'Present', time: '2:00 PM', room: 'Room 105' },
      { courseCode: 'PHY101', status: 'Absent', time: '3:30 PM', room: 'Lab 201' }
    ]
  },
  {
    date: '2024-01-12',
    courses: [
      { courseCode: 'CS101', status: 'Present', time: '10:00 AM', room: 'Room 201' },
      { courseCode: 'ENG102', status: 'Late', time: '1:00 PM', room: 'Room 301' },
      { courseCode: 'PHY101', status: 'Absent', time: '3:30 PM', room: 'Lab 201' }
    ]
  },
  {
    date: '2024-01-11',
    courses: [
      { courseCode: 'MATH201', status: 'Present', time: '2:00 PM', room: 'Room 105' }
    ]
  },
  {
    date: '2024-01-10',
    courses: [
      { courseCode: 'CS101', status: 'Present', time: '10:00 AM', room: 'Room 201' },
      { courseCode: 'PHY101', status: 'Present', time: '3:30 PM', room: 'Lab 201' }
    ]
  }
];

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 85) return 'text-green-600';
  if (percentage >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Good': return 'bg-green-100 text-green-800';
    case 'Warning': return 'bg-yellow-100 text-yellow-800';
    case 'Critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getAttendanceStatusColor = (status: string) => {
  switch (status) {
    case 'Present': return 'bg-green-100 text-green-800';
    case 'Late': return 'bg-yellow-100 text-yellow-800';
    case 'Absent': return 'bg-red-100 text-red-800';
    case 'Excused': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Attendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState('January 2024');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const overallAttendance = mockAttendance.reduce((sum, record) => 
    sum + record.percentage, 0) / mockAttendance.length;

  const totalClasses = mockAttendance.reduce((sum, record) => sum + record.totalClasses, 0);
  const totalAttended = mockAttendance.reduce((sum, record) => sum + record.attendedClasses, 0);

  const lowAttendanceCourses = mockAttendance.filter(record => record.percentage < 75);
  const criticalCourses = mockAttendance.filter(record => record.status === 'Critical');

  const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={percentage >= 85 ? '#10b981' : percentage >= 75 ? '#f59e0b' : '#ef4444'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getAttendanceColor(percentage)}`}>
              {percentage.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Attendance</div>
          </div>
        </div>
      </div>
    );
  };

  const AttendanceTrend = () => {
    const weeklyData = [
      { week: 'Week 1', percentage: 95 },
      { week: 'Week 2', percentage: 88 },
      { week: 'Week 3', percentage: 92 },
      { week: 'Week 4', percentage: 85 },
      { week: 'Week 5', percentage: overallAttendance }
    ];

    const maxPercentage = Math.max(...weeklyData.map(d => d.percentage));

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Weekly Attendance Trend</h4>
        <div className="space-y-3">
          {weeklyData.map((item, index) => (
            <div key={item.week} className="flex items-center gap-3">
              <div className="w-16 text-sm font-medium text-gray-600">{item.week}</div>
              <div className="flex-1">
                <Progress value={(item.percentage / maxPercentage) * 100} className="h-3" />
              </div>
              <div className={`w-12 text-sm font-semibold ${getAttendanceColor(item.percentage)}`}>
                {item.percentage.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout activeSection="attendance">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track your class attendance and performance</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="January 2024">January 2024</option>
            <option value="December 2023">December 2023</option>
            <option value="November 2023">November 2023</option>
          </select>
          
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </Button>
        </div>
      </div>

      {/* Alerts for Low Attendance */}
      {criticalCourses.length > 0 && (
        <div className="mb-6 border-red-200 bg-red-50 p-4 rounded-md border flex items-center space-x-3">
          <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="text-red-800">
            <strong>Critical Attendance Warning:</strong> You have {criticalCourses.length} course(s) with attendance below 60%. 
            Immediate action required to avoid academic penalties.
          </div>
        </div>
      )}

      {lowAttendanceCourses.length > 0 && criticalCourses.length === 0 && (
        <div className="mb-6 border-yellow-200 bg-yellow-50 p-4 rounded-md border flex items-center space-x-3">
          <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="text-yellow-800">
            <strong>Attendance Warning:</strong> You have {lowAttendanceCourses.length} course(s) with attendance below 75%. 
            Please improve attendance to maintain good academic standing.
          </div>
        </div>
      )}

      {/* Overall Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className={`text-2xl font-bold ${getAttendanceColor(overallAttendance)}`}>
                  {overallAttendance.toFixed(1)}%
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{totalAttended}/{totalClasses}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Missed</p>
                <p className="text-2xl font-bold text-red-600">{totalClasses - totalAttended}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk Courses</p>
                <p className="text-2xl font-bold text-orange-600">{lowAttendanceCourses.length}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="w-full">
        <div className="grid w-full grid-cols-4 gap-2 mb-6">
          <Button 
            variant={activeTab === 'overview' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'courses' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('courses')}
          >
            By Course
          </Button>
          <Button 
            variant={activeTab === 'calendar' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar View
          </Button>
          <Button 
            variant={activeTab === 'analytics' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
        </div>
        
        {activeTab === 'overview' && (
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course-wise Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAttendance.map(record => (
                      <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{record.courseCode}</h4>
                            <Badge className={getStatusColor(record.status)} variant="outline">
                              {record.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{record.courseName}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Attended: {record.attendedClasses}/{record.totalClasses}</span>
                            <span>Last: {new Date(record.lastAttended).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getAttendanceColor(record.percentage)}`}>
                            {record.percentage.toFixed(1)}%
                          </div>
                          <Progress value={record.percentage} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CircularProgress percentage={overallAttendance} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        )}
        
        {activeTab === 'courses' && (
        <div className="mt-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Courses</option>
                {mockAttendance.map(record => (
                  <option key={record.id} value={record.courseCode}>
                    {record.courseCode} - {record.courseName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAttendance
                .filter(record => selectedCourse === 'all' || record.courseCode === selectedCourse)
                .map(record => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.courseCode}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{record.courseName}</p>
                      </div>
                      <Badge className={getStatusColor(record.status)} variant="outline">
                        {record.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <CircularProgress percentage={record.percentage} size={100} />
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Classes Attended:</span>
                        <span className="font-medium">{record.attendedClasses}/{record.totalClasses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Instructor:</span>
                        <span className="font-medium">{record.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Attended:</span>
                        <span className="font-medium">{new Date(record.lastAttended).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        )}
        
        {activeTab === 'calendar' && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Log</CardTitle>
              <p className="text-sm text-gray-600">Recent attendance records</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDailyAttendance.map(day => (
                  <div key={day.date} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h4>
                      <div className="text-sm text-gray-600">
                        {day.courses.length} class(es)
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {day.courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium text-gray-900">{course.courseCode}</div>
                            <div className="text-xs text-gray-600">{course.time} • {course.room}</div>
                          </div>
                          <Badge className={getAttendanceStatusColor(course.status)} variant="outline">
                            {course.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        )}
        
        {activeTab === 'analytics' && (
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <AttendanceTrend />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Best Performing Course</h4>
                  <p className="text-sm text-blue-700">
                    {mockAttendance.reduce((best, current) => 
                      current.percentage > best.percentage ? current : best
                    ).courseCode} - {mockAttendance.reduce((best, current) => 
                      current.percentage > best.percentage ? current : best
                    ).percentage.toFixed(1)}%
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Needs Improvement</h4>
                  <p className="text-sm text-yellow-700">
                    {lowAttendanceCourses.length > 0 
                      ? `${lowAttendanceCourses[0].courseCode} - ${lowAttendanceCourses[0].percentage.toFixed(1)}%`
                      : 'All courses performing well'
                    }
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Attendance Goal</h4>
                  <p className="text-sm text-green-700 mb-2">Target: 85% minimum</p>
                  <Progress value={(overallAttendance / 85) * 100} className="h-2" />
                  <p className="text-xs text-green-600 mt-1">
                    {overallAttendance >= 85 ? 'Goal achieved! 🎉' : `${(85 - overallAttendance).toFixed(1)}% to go`}
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Monthly Summary</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>Total Classes: {totalClasses}</p>
                    <p>Present: {totalAttended}</p>
                    <p>Absent: {totalClasses - totalAttended}</p>
                    <p>Average: {overallAttendance.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;