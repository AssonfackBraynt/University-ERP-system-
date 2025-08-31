import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { DashboardLayout } from '../../components/layout';
// Select, Tabs, and Alert components not available - using simple state management instead
import { Progress } from '../../components/ui/Progress';

interface Exam {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  instructor: string;
  totalMarks: number;
  passingMarks: number;
  syllabus?: string[];
  instructions?: string[];
  status: 'Upcoming' | 'Completed' | 'In Progress';
}

interface ExamResult {
  id: string;
  examId: string;
  courseCode: string;
  courseName: string;
  examType: 'Midterm' | 'Final' | 'Quiz' | 'Assignment';
  date: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  classAverage: number;
  feedback?: string;
}

const mockUpcomingExams: Exam[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    examType: 'Final',
    date: '2024-01-25',
    time: '09:00',
    duration: 180,
    location: 'Main Hall A',
    instructor: 'Dr. Sarah Johnson',
    totalMarks: 100,
    passingMarks: 40,
    syllabus: ['Data Structures', 'Algorithms', 'Programming Fundamentals', 'Object-Oriented Programming'],
    instructions: ['Bring student ID', 'No electronic devices allowed', 'Use blue/black pen only'],
    status: 'Upcoming'
  },
  {
    id: '2',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    examType: 'Midterm',
    date: '2024-01-22',
    time: '14:00',
    duration: 120,
    location: 'Room 205',
    instructor: 'Prof. Michael Chen',
    totalMarks: 50,
    passingMarks: 20,
    syllabus: ['Integration Techniques', 'Applications of Integration', 'Differential Equations'],
    instructions: ['Calculator allowed', 'Formula sheet provided', 'Show all work'],
    status: 'Upcoming'
  },
  {
    id: '3',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    examType: 'Quiz',
    date: '2024-01-20',
    time: '11:00',
    duration: 60,
    location: 'Room 301',
    instructor: 'Dr. Emily Rodriguez',
    totalMarks: 25,
    passingMarks: 10,
    syllabus: ['Essay Writing', 'Grammar Rules', 'Literature Analysis'],
    instructions: ['Dictionary allowed', 'Write in essay format', 'Minimum 500 words'],
    status: 'Upcoming'
  },
  {
    id: '4',
    courseCode: 'PHY101',
    courseName: 'Physics I',
    examType: 'Assignment',
    date: '2024-01-28',
    time: '23:59',
    duration: 0,
    location: 'Online Submission',
    instructor: 'Dr. James Miller',
    totalMarks: 30,
    passingMarks: 12,
    syllabus: ['Mechanics', 'Thermodynamics', 'Wave Motion'],
    instructions: ['Submit PDF format', 'Include calculations', 'Cite all sources'],
    status: 'Upcoming'
  }
];

const mockExamResults: ExamResult[] = [
  {
    id: '1',
    examId: 'past1',
    courseCode: 'CS100',
    courseName: 'Programming Fundamentals',
    examType: 'Final',
    date: '2023-12-15',
    marksObtained: 85,
    totalMarks: 100,
    percentage: 85,
    grade: 'A',
    rank: 5,
    classAverage: 78.5,
    feedback: 'Excellent understanding of programming concepts. Keep up the good work!'
  },
  {
    id: '2',
    examId: 'past2',
    courseCode: 'MATH101',
    courseName: 'Calculus I',
    examType: 'Midterm',
    date: '2023-11-20',
    marksObtained: 42,
    totalMarks: 50,
    percentage: 84,
    grade: 'A',
    rank: 8,
    classAverage: 75.2,
    feedback: 'Strong performance in integration problems. Work on differentiation speed.'
  },
  {
    id: '3',
    examId: 'past3',
    courseCode: 'ENG101',
    courseName: 'English Literature',
    examType: 'Quiz',
    date: '2023-11-10',
    marksObtained: 18,
    totalMarks: 25,
    percentage: 72,
    grade: 'B+',
    rank: 12,
    classAverage: 68.8,
    feedback: 'Good analysis skills. Improve essay structure and grammar.'
  },
  {
    id: '4',
    examId: 'past4',
    courseCode: 'PHY100',
    courseName: 'Basic Physics',
    examType: 'Final',
    date: '2023-12-18',
    marksObtained: 38,
    totalMarks: 50,
    percentage: 76,
    grade: 'B+',
    rank: 15,
    classAverage: 71.3,
    feedback: 'Good theoretical knowledge. Practice more numerical problems.'
  }
];

const getExamTypeColor = (type: string) => {
  switch (type) {
    case 'Final': return 'bg-red-100 text-red-800';
    case 'Midterm': return 'bg-blue-100 text-blue-800';
    case 'Quiz': return 'bg-green-100 text-green-800';
    case 'Assignment': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getGradeColor = (grade: string) => {
  if (grade === 'A' || grade === 'A+') return 'text-green-600';
  if (grade === 'A-' || grade === 'B+') return 'text-blue-600';
  if (grade === 'B' || grade === 'B-') return 'text-yellow-600';
  if (grade === 'C+' || grade === 'C') return 'text-orange-600';
  return 'text-red-600';
};

const formatTimeRemaining = (targetDate: string, targetTime: string) => {
  const now = new Date();
  const target = new Date(`${targetDate}T${targetTime}:00`);
  const diff = target.getTime() - now.getTime();
  
  if (diff <= 0) return 'Exam Started';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const Exams: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedSemester, setSelectedSemester] = useState('Spring 2024');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const nextExam = mockUpcomingExams
    .filter(exam => new Date(`${exam.date}T${exam.time}:00`) > currentTime)
    .sort((a, b) => new Date(`${a.date}T${a.time}:00`).getTime() - new Date(`${b.date}T${b.time}:00`).getTime())[0];
  
  const upcomingThisWeek = mockUpcomingExams.filter(exam => {
    const examDate = new Date(exam.date);
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return examDate <= weekFromNow && examDate >= new Date();
  });
  
  const CountdownTimer = ({ exam }: { exam: Exam }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    
    useEffect(() => {
      const updateCountdown = () => {
        setTimeRemaining(formatTimeRemaining(exam.date, exam.time));
      };
      
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
      
      return () => clearInterval(timer);
    }, [exam.date, exam.time]);
    
    return (
      <div className="text-center">
        <div className="text-3xl font-bold text-red-600 mb-1">{timeRemaining}</div>
        <div className="text-sm text-gray-600">until {exam.courseCode} {exam.examType}</div>
      </div>
    );
  };
  
  const ExamCard = ({ exam, showCountdown = false }: { exam: Exam; showCountdown?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exam.courseCode}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{exam.courseName}</p>
          </div>
          <Badge className={getExamTypeColor(exam.examType)} variant="outline">
            {exam.examType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {showCountdown && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <CountdownTimer exam={exam} />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{new Date(exam.date).toLocaleDateString()}</span>
            <span className="text-gray-600">at {exam.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{exam.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{exam.duration > 0 ? `${exam.duration} minutes` : 'No time limit'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{exam.instructor}</span>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Marks:</span>
              <span className="font-medium">{exam.totalMarks}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Passing Marks:</span>
              <span className="font-medium">{exam.passingMarks}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const ResultCard = ({ result }: { result: ExamResult }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{result.courseCode}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{result.courseName}</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
              {result.grade}
            </div>
            <div className="text-sm text-gray-600">{result.percentage}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Badge className={getExamTypeColor(result.examType)} variant="outline">
              {result.examType}
            </Badge>
            <span className="text-sm text-gray-600">
              {new Date(result.date).toLocaleDateString()}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Score:</span>
              <span className="font-medium">{result.marksObtained}/{result.totalMarks}</span>
            </div>
            
            {result.rank && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rank:</span>
                <span className="font-medium">#{result.rank}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Class Average:</span>
              <span className="font-medium">{result.classAverage}%</span>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Your Score</span>
              <span>Class Average</span>
            </div>
            <div className="relative">
              <Progress value={(result.percentage / 100) * 100} className="h-2" />
              <div 
                className="absolute top-0 h-2 w-0.5 bg-gray-400"
                style={{ left: `${result.classAverage}%` }}
              />
            </div>
          </div>
          
          {result.feedback && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Feedback:</strong> {result.feedback}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <DashboardLayout activeSection="exams">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
          <p className="text-gray-600 mt-1">Manage your exam schedule and view results</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2023">Fall 2023</option>
            <option value="Summer 2023">Summer 2023</option>
          </select>
          
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Schedule
          </Button>
        </div>
      </div>
      
      {/* Next Exam Alert */}
      {nextExam && (
        <div className="mb-6 border-blue-200 bg-blue-50 p-4 rounded-md border flex items-center space-x-3">
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-blue-800">
            <strong>Next Exam:</strong> {nextExam.courseCode} {nextExam.examType} on {new Date(nextExam.date).toLocaleDateString()} at {nextExam.time} in {nextExam.location}
          </div>
        </div>
      )}
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Exams</p>
                <p className="text-2xl font-bold text-blue-600">{mockUpcomingExams.length}</p>
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
                <p className="text-2xl font-bold text-orange-600">{upcomingThisWeek.length}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {(mockExamResults.reduce((sum, result) => sum + result.percentage, 0) / mockExamResults.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">{mockExamResults.length}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            variant={activeTab === 'upcoming' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </Button>
          <Button 
            variant={activeTab === 'results' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('results')}
          >
            Results
          </Button>
          <Button 
            variant={activeTab === 'schedule' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule
          </Button>
          <Button 
            variant={activeTab === 'rules' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('rules')}
          >
            Rules & Info
          </Button>
        </div>
        
        {activeTab === 'upcoming' && (
        <div className="mt-6">
          <div className="space-y-6">
            {nextExam && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Exam</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ExamCard exam={nextExam} showCountdown={true} />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Exam Preparation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Syllabus Coverage</h4>
                          <div className="space-y-1">
                            {nextExam.syllabus?.map((topic, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
                          <div className="space-y-1">
                            {nextExam.instructions?.map((instruction, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{instruction}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Upcoming Exams</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockUpcomingExams.map(exam => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
        
        {activeTab === 'results' && (
        <div className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Exam Results</h3>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Transcript
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockExamResults.map(result => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        </div>
        )}
        
        {activeTab === 'schedule' && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Schedule</CardTitle>
              <p className="text-sm text-gray-600">Complete exam timetable for the semester</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingExams
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(exam => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">{exam.courseCode}</h4>
                        <Badge className={getExamTypeColor(exam.examType)} variant="outline">
                          {exam.examType}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{exam.courseName}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{exam.location}</span>
                        <span>{exam.duration > 0 ? `${exam.duration} min` : 'No limit'}</span>
                        <span>{exam.instructor}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {new Date(exam.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">{exam.time}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTimeRemaining(exam.date, exam.time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        )}
        
        {activeTab === 'rules' && (
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Exam Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Arrive at least 15 minutes before the exam starts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Bring valid student ID and required stationery</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Mobile phones and electronic devices must be switched off</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>No talking or communication during the exam</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Raise your hand if you need assistance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Submit your paper before leaving the exam hall</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>All work must be your own original effort</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Plagiarism and cheating are strictly prohibited</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Unauthorized materials are not allowed</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Violations may result in exam failure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Report any suspicious behavior to invigilators</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Special Accommodations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>Students with documented disabilities may request:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Extended time allowances</li>
                    <li>• Alternative exam formats</li>
                    <li>• Separate testing rooms</li>
                    <li>• Assistive technologies</li>
                  </ul>
                  <p className="text-blue-600 font-medium">
                    Contact Student Services at least 2 weeks before the exam.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emergency Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-red-800 mb-1">Fire Alarm</p>
                    <p className="text-red-700">Stop writing immediately and follow evacuation procedures</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800 mb-1">Medical Emergency</p>
                    <p className="text-yellow-700">Raise your hand and remain seated until help arrives</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800 mb-1">Technical Issues</p>
                    <p className="text-blue-700">Notify the invigilator immediately for assistance</p>
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

export default Exams;