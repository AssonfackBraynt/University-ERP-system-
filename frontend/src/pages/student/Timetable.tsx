import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { DashboardLayout } from '../../components/layout';
// Select component not available - using simple dropdown instead
// Tabs component not available - using simple state management instead

interface TimeSlot {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  type: 'lecture' | 'lab' | 'tutorial';
  color: string;
}

interface ExamSlot {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'Midterm' | 'Final' | 'Quiz';
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  duration: string;
}

const mockSchedule: TimeSlot[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    room: 'Room 201',
    startTime: '10:00',
    endTime: '11:00',
    day: 'Monday',
    type: 'lecture',
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    id: '2',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    room: 'Room 201',
    startTime: '10:00',
    endTime: '11:00',
    day: 'Wednesday',
    type: 'lecture',
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    id: '3',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    room: 'Room 201',
    startTime: '10:00',
    endTime: '11:00',
    day: 'Friday',
    type: 'lecture',
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    id: '4',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    instructor: 'Prof. Michael Chen',
    room: 'Room 105',
    startTime: '14:00',
    endTime: '15:30',
    day: 'Tuesday',
    type: 'lecture',
    color: 'bg-green-100 border-green-300 text-green-800'
  },
  {
    id: '5',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    instructor: 'Prof. Michael Chen',
    room: 'Room 105',
    startTime: '14:00',
    endTime: '15:30',
    day: 'Thursday',
    type: 'lecture',
    color: 'bg-green-100 border-green-300 text-green-800'
  },
  {
    id: '6',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    instructor: 'Dr. Emily Rodriguez',
    room: 'Room 301',
    startTime: '13:00',
    endTime: '14:30',
    day: 'Monday',
    type: 'lecture',
    color: 'bg-purple-100 border-purple-300 text-purple-800'
  },
  {
    id: '7',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    instructor: 'Dr. Emily Rodriguez',
    room: 'Room 301',
    startTime: '13:00',
    endTime: '14:30',
    day: 'Wednesday',
    type: 'lecture',
    color: 'bg-purple-100 border-purple-300 text-purple-800'
  },
  {
    id: '8',
    courseCode: 'CS101',
    courseName: 'Computer Science Lab',
    instructor: 'TA: John Smith',
    room: 'Lab 101',
    startTime: '15:00',
    endTime: '17:00',
    day: 'Friday',
    type: 'lab',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  }
];

const mockExams: ExamSlot[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    examType: 'Midterm',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '11:00',
    room: 'Exam Hall A',
    duration: '2 hours'
  },
  {
    id: '2',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    examType: 'Final',
    date: '2024-04-20',
    startTime: '14:00',
    endTime: '17:00',
    room: 'Exam Hall B',
    duration: '3 hours'
  },
  {
    id: '3',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    examType: 'Quiz',
    date: '2024-03-10',
    startTime: '13:00',
    endTime: '14:00',
    room: 'Room 301',
    duration: '1 hour'
  }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Timetable: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('weekly');

  const getClassesForTimeAndDay = (time: string, day: string) => {
    return mockSchedule.filter(slot => 
      slot.startTime === time && slot.day === day
    );
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const exportToPDF = () => {
    // Mock PDF export functionality
    alert('Exporting timetable to PDF...');
  };

  const printTimetable = () => {
    window.print();
  };

  const WeeklyView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-7 gap-1 mb-2">
          <div className="p-2 text-center font-medium text-gray-600">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-900 bg-gray-50 rounded">
              {day}
            </div>
          ))}
        </div>
        
        {timeSlots.map(time => (
          <div key={time} className="grid grid-cols-7 gap-1 mb-1">
            <div className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded">
              {formatTime(time)}
            </div>
            {days.map(day => {
              const classes = getClassesForTimeAndDay(time, day);
              return (
                <div key={`${time}-${day}`} className="min-h-[60px] relative">
                  {classes.map(classItem => (
                    <div
                      key={classItem.id}
                      className={`absolute inset-0 p-1 rounded border-l-4 cursor-pointer transition-all duration-200 hover:shadow-md ${classItem.color}`}
                      onMouseEnter={() => setHoveredSlot(classItem.id)}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      <div className="text-xs font-semibold truncate">
                        {classItem.courseCode}
                      </div>
                      <div className="text-xs truncate">
                        {classItem.room}
                      </div>
                      <div className="text-xs truncate">
                        {classItem.startTime}-{classItem.endTime}
                      </div>
                      
                      {hoveredSlot === classItem.id && (
                        <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 top-full left-0 mt-1 w-64">
                          <h4 className="font-semibold text-gray-900">{classItem.courseCode}</h4>
                          <p className="text-sm text-gray-600">{classItem.courseName}</p>
                          <div className="mt-2 space-y-1 text-xs text-gray-600">
                            <p><span className="font-medium">Instructor:</span> {classItem.instructor}</p>
                            <p><span className="font-medium">Room:</span> {classItem.room}</p>
                            <p><span className="font-medium">Time:</span> {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}</p>
                            <p><span className="font-medium">Type:</span> {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const DayView = ({ selectedDay, setSelectedDay }: { selectedDay: string, setSelectedDay: (day: string) => void }) => {
    const formatTime = (time: string) => {
      const [hour, minute] = time.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
      return `${displayHour}:${minute} ${ampm}`;
    };
    
    const dayClasses = mockSchedule.filter(slot => slot.day === selectedDay);
    
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{selectedDay} Schedule</h3>
          <div className="flex gap-1 flex-wrap">
            {days.map(day => (
              <Button 
                key={day}
                variant={selectedDay === day ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setSelectedDay(day)}
              >
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
        
        {dayClasses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-600">No classes scheduled for {selectedDay}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {dayClasses.sort((a, b) => a.startTime.localeCompare(b.startTime)).map(classItem => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{classItem.courseCode}</h4>
                        <Badge variant="outline" className={classItem.color}>
                          {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{classItem.courseName}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Time:</span> {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                        </div>
                        <div>
                          <span className="font-medium">Room:</span> {classItem.room}
                        </div>
                        <div>
                          <span className="font-medium">Instructor:</span> {classItem.instructor}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ExamSchedule = () => {
    const formatTime = (time: string) => {
      const [hour, minute] = time.split(':');
      const hourNum = parseInt(hour);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
      return `${displayHour}:${minute} ${ampm}`;
    };
    
    return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Upcoming exams and assessments for the current semester
      </div>
      
      {mockExams.map(exam => (
        <Card key={exam.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{exam.courseCode}</h4>
                  <Badge 
                    variant={exam.examType === 'Final' ? 'error' : exam.examType === 'Midterm' ? 'default' : 'outline'}
                  >
                    {exam.examType}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{exam.courseName}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Date:</span> {new Date(exam.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {exam.duration}
                  </div>
                  <div>
                    <span className="font-medium">Room:</span> {exam.room}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    );
  };

  return (
    <DashboardLayout activeSection="timetable">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600 mt-1">View your class schedule and exam timetable</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1">
            <Button 
              variant={selectedWeek === 'previous' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedWeek('previous')}
            >
              Previous
            </Button>
            <Button 
              variant={selectedWeek === 'current' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedWeek('current')}
            >
              Current
            </Button>
            <Button 
              variant={selectedWeek === 'next' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedWeek('next')}
            >
              Next
            </Button>
          </div>
          
          <Button variant="outline" onClick={exportToPDF}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </Button>
          
          <Button variant="outline" onClick={printTimetable}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </Button>
        </div>
      </div>

      {/* Schedule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{mockSchedule.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-green-600">{mockSchedule.length}</p>
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
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-orange-600">{mockExams.length}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Free Hours</p>
                <p className="text-2xl font-bold text-purple-600">25</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timetable Navigation */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2 mb-6">
          <Button 
            variant={activeTab === 'weekly' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('weekly')}
            className="w-full"
          >
            Weekly View
          </Button>
          <Button 
            variant={activeTab === 'daily' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('daily')}
            className="w-full"
          >
            Daily View
          </Button>
          <Button 
            variant={activeTab === 'exams' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('exams')}
            className="w-full"
          >
            Exam Schedule
          </Button>
        </div>
        
        {activeTab === 'weekly' && (
          <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Schedule</CardTitle>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                    <span>Lecture</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
                    <span>Lab</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Tutorial</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <WeeklyView />
            </CardContent>
          </Card>
          </div>
        )}
        
        {activeTab === 'daily' && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <DayView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'exams' && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Examination Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ExamSchedule />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default Timetable;