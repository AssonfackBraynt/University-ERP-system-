import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { DashboardLayout } from '../../components/layout';
// Select and Tabs components not available - using simple state management instead
import { Progress } from '../../components/ui/Progress';

interface Grade {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gpa: number;
  semester: string;
  year: string;
  instructor: string;
  assignments: Assignment[];
}

interface Assignment {
  id: string;
  name: string;
  type: 'Assignment' | 'Quiz' | 'Midterm' | 'Final' | 'Project';
  score: number;
  maxScore: number;
  weight: number;
  date: string;
}

const mockGrades: Grade[] = [
  {
    id: '1',
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    credits: 3,
    grade: 'A',
    gpa: 4.0,
    semester: 'Fall',
    year: '2023',
    instructor: 'Dr. Sarah Johnson',
    assignments: [
      { id: '1', name: 'Assignment 1', type: 'Assignment', score: 95, maxScore: 100, weight: 15, date: '2023-09-15' },
      { id: '2', name: 'Quiz 1', type: 'Quiz', score: 88, maxScore: 100, weight: 10, date: '2023-09-22' },
      { id: '3', name: 'Midterm Exam', type: 'Midterm', score: 92, maxScore: 100, weight: 25, date: '2023-10-15' },
      { id: '4', name: 'Final Project', type: 'Project', score: 96, maxScore: 100, weight: 30, date: '2023-11-30' },
      { id: '5', name: 'Final Exam', type: 'Final', score: 90, maxScore: 100, weight: 20, date: '2023-12-10' }
    ]
  },
  {
    id: '2',
    courseCode: 'MATH201',
    courseName: 'Calculus II',
    credits: 4,
    grade: 'B+',
    gpa: 3.3,
    semester: 'Fall',
    year: '2023',
    instructor: 'Prof. Michael Chen',
    assignments: [
      { id: '6', name: 'Homework 1', type: 'Assignment', score: 85, maxScore: 100, weight: 20, date: '2023-09-20' },
      { id: '7', name: 'Quiz 1', type: 'Quiz', score: 78, maxScore: 100, weight: 15, date: '2023-09-28' },
      { id: '8', name: 'Midterm Exam', type: 'Midterm', score: 82, maxScore: 100, weight: 30, date: '2023-10-20' },
      { id: '9', name: 'Final Exam', type: 'Final', score: 87, maxScore: 100, weight: 35, date: '2023-12-12' }
    ]
  },
  {
    id: '3',
    courseCode: 'ENG102',
    courseName: 'English Composition',
    credits: 3,
    grade: 'A-',
    gpa: 3.7,
    semester: 'Fall',
    year: '2023',
    instructor: 'Dr. Emily Rodriguez',
    assignments: [
      { id: '10', name: 'Essay 1', type: 'Assignment', score: 88, maxScore: 100, weight: 25, date: '2023-09-25' },
      { id: '11', name: 'Research Paper', type: 'Project', score: 92, maxScore: 100, weight: 35, date: '2023-11-15' },
      { id: '12', name: 'Final Essay', type: 'Final', score: 90, maxScore: 100, weight: 40, date: '2023-12-08' }
    ]
  },
  {
    id: '4',
    courseCode: 'HIST101',
    courseName: 'World History',
    credits: 3,
    grade: 'B',
    gpa: 3.0,
    semester: 'Spring',
    year: '2023',
    instructor: 'Prof. David Wilson',
    assignments: [
      { id: '13', name: 'Midterm Exam', type: 'Midterm', score: 80, maxScore: 100, weight: 40, date: '2023-03-15' },
      { id: '14', name: 'Final Exam', type: 'Final', score: 85, maxScore: 100, weight: 60, date: '2023-05-10' }
    ]
  }
];

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A': case 'A+': return 'bg-green-100 text-green-800 border-green-200';
    case 'A-': return 'bg-green-50 text-green-700 border-green-200';
    case 'B+': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'B': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'B-': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'C+': case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-red-100 text-red-800 border-red-200';
  }
};

const getAcademicStanding = (gpa: number) => {
  if (gpa >= 3.5) return { status: 'Dean\'s List', color: 'bg-green-100 text-green-800', icon: '🏆' };
  if (gpa >= 3.0) return { status: 'Good Standing', color: 'bg-blue-100 text-blue-800', icon: '✅' };
  if (gpa >= 2.0) return { status: 'Academic Warning', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' };
  return { status: 'Academic Probation', color: 'bg-red-100 text-red-800', icon: '🚨' };
};

const Grades: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedSemester, setSelectedSemester] = useState('Fall 2023');
  const [selectedCourse, setSelectedCourse] = useState<Grade | null>(null);

  const currentSemesterGrades = mockGrades.filter(grade => 
    `${grade.semester} ${grade.year}` === selectedSemester
  );

  const currentSemesterGPA = currentSemesterGrades.length > 0 
    ? currentSemesterGrades.reduce((sum, grade) => sum + (grade.gpa * grade.credits), 0) / 
      currentSemesterGrades.reduce((sum, grade) => sum + grade.credits, 0)
    : 0;

  const cumulativeGPA = mockGrades.length > 0
    ? mockGrades.reduce((sum, grade) => sum + (grade.gpa * grade.credits), 0) / 
      mockGrades.reduce((sum, grade) => sum + grade.credits, 0)
    : 0;

  const totalCredits = mockGrades.reduce((sum, grade) => sum + grade.credits, 0);
  const completedCredits = mockGrades.filter(grade => parseFloat(grade.gpa.toString()) >= 2.0).reduce((sum, grade) => sum + grade.credits, 0);

  const academicStanding = getAcademicStanding(cumulativeGPA);

  const exportTranscript = () => {
    alert('Exporting official transcript to PDF...');
  };

  const GradeChart = () => {
    const gradeDistribution = mockGrades.reduce((acc, grade) => {
      acc[grade.grade] = (acc[grade.grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const maxCount = Math.max(...Object.values(gradeDistribution));

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Grade Distribution</h4>
        {Object.entries(gradeDistribution).map(([grade, count]) => (
          <div key={grade} className="flex items-center gap-3">
            <div className="w-8 text-sm font-medium text-gray-600">{grade}</div>
            <div className="flex-1">
              <Progress value={(count / maxCount) * 100} className="h-2" />
            </div>
            <div className="w-8 text-sm text-gray-600">{count}</div>
          </div>
        ))}
      </div>
    );
  };

  const GPATrend = () => {
    const semesterGPAs = [
      { semester: 'Spring 2023', gpa: 3.2 },
      { semester: 'Fall 2023', gpa: currentSemesterGPA }
    ];

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">GPA Trend</h4>
        <div className="space-y-3">
          {semesterGPAs.map((item, index) => (
            <div key={item.semester} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">{item.semester}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">{item.gpa.toFixed(2)}</span>
                {index > 0 && (
                  <span className={`text-sm ${
                    item.gpa > semesterGPAs[index - 1].gpa ? 'text-green-600' : 
                    item.gpa < semesterGPAs[index - 1].gpa ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {item.gpa > semesterGPAs[index - 1].gpa ? '↗️' : 
                     item.gpa < semesterGPAs[index - 1].gpa ? '↘️' : '→'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout activeSection="grades">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grades & Performance</h1>
          <p className="text-gray-600 mt-1">Track your academic progress and performance</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="Fall 2023">Fall 2023</option>
            <option value="Spring 2023">Spring 2023</option>
            <option value="Fall 2022">Fall 2022</option>
          </select>
          
          <Button variant="outline" onClick={exportTranscript}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Transcript
          </Button>
        </div>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current GPA</p>
                <p className="text-2xl font-bold text-blue-600">{currentSemesterGPA.toFixed(2)}</p>
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
                <p className="text-sm font-medium text-gray-600">Cumulative GPA</p>
                <p className="text-2xl font-bold text-green-600">{cumulativeGPA.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Earned</p>
                <p className="text-2xl font-bold text-purple-600">{completedCredits}/{totalCredits}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Academic Standing</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-lg">{academicStanding.icon}</span>
                  <Badge className={academicStanding.color} variant="outline">
                    {academicStanding.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="w-full">
        <div className="grid w-full grid-cols-4 gap-2 mb-6">
          <Button 
            variant={activeTab === 'current' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('current')}
          >
            Current Grades
          </Button>
          <Button 
            variant={activeTab === 'transcript' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('transcript')}
          >
            Transcript
          </Button>
          <Button 
            variant={activeTab === 'analytics' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button 
            variant={activeTab === 'progress' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </Button>
        </div>
        
        {activeTab === 'current' && (
        <div className="mt-6">
          <div className="space-y-4">
            {currentSemesterGrades.map(grade => (
              <Card key={grade.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{grade.courseCode}</h3>
                        <Badge className={getGradeColor(grade.grade)} variant="outline">
                          {grade.grade}
                        </Badge>
                        <span className="text-sm text-gray-600">GPA: {grade.gpa.toFixed(1)}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{grade.courseName}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Instructor:</span> {grade.instructor}
                        </div>
                        <div>
                          <span className="font-medium">Credits:</span> {grade.credits}
                        </div>
                        <div>
                          <span className="font-medium">Semester:</span> {grade.semester} {grade.year}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCourse(selectedCourse?.id === grade.id ? null : grade)}
                    >
                      {selectedCourse?.id === grade.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>
                  
                  {selectedCourse?.id === grade.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Assignment Breakdown</h4>
                      <div className="space-y-2">
                        {grade.assignments.map(assignment => (
                          <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{assignment.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {assignment.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Weight: {assignment.weight}% • Due: {new Date(assignment.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {assignment.score}/{assignment.maxScore}
                              </div>
                              <div className={`text-sm ${
                                (assignment.score / assignment.maxScore) >= 0.9 ? 'text-green-600' :
                                (assignment.score / assignment.maxScore) >= 0.8 ? 'text-blue-600' :
                                (assignment.score / assignment.maxScore) >= 0.7 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}
        
        {activeTab === 'transcript' && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Official Transcript</CardTitle>
              <p className="text-sm text-gray-600">Complete academic record</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Spring 2023', 'Fall 2023'].map(semester => {
                  const semesterCourses = mockGrades.filter(grade => 
                    `${grade.semester} ${grade.year}` === semester
                  );
                  const semesterGPA = semesterCourses.length > 0 
                    ? semesterCourses.reduce((sum, grade) => sum + (grade.gpa * grade.credits), 0) / 
                      semesterCourses.reduce((sum, grade) => sum + grade.credits, 0)
                    : 0;
                  
                  return (
                    <div key={semester}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{semester}</h3>
                        <div className="text-sm text-gray-600">
                          Semester GPA: <span className="font-semibold">{semesterGPA.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 font-medium text-gray-900">Course</th>
                              <th className="text-left py-2 font-medium text-gray-900">Title</th>
                              <th className="text-center py-2 font-medium text-gray-900">Credits</th>
                              <th className="text-center py-2 font-medium text-gray-900">Grade</th>
                              <th className="text-center py-2 font-medium text-gray-900">GPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {semesterCourses.map(course => (
                              <tr key={course.id} className="border-b border-gray-100">
                                <td className="py-2 font-medium text-gray-900">{course.courseCode}</td>
                                <td className="py-2 text-gray-600">{course.courseName}</td>
                                <td className="py-2 text-center text-gray-600">{course.credits}</td>
                                <td className="py-2 text-center">
                                  <Badge className={getGradeColor(course.grade)} variant="outline">
                                    {course.grade}
                                  </Badge>
                                </td>
                                <td className="py-2 text-center font-medium text-gray-900">{course.gpa.toFixed(1)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
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
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <GradeChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <GPATrend />
              </CardContent>
            </Card>
          </div>
        </div>
        )}
        
        {activeTab === 'progress' && (
        <div className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Degree Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Total Credits</span>
                    <span>{completedCredits}/120</span>
                  </div>
                  <Progress value={(completedCredits / 120) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Core Requirements</span>
                    <span>8/12</span>
                  </div>
                  <Progress value={(8 / 12) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Major Requirements</span>
                    <span>6/18</span>
                  </div>
                  <Progress value={(6 / 18) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Electives</span>
                    <span>3/15</span>
                  </div>
                  <Progress value={(3 / 15) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Target GPA: 3.5</h4>
                  <p className="text-sm text-blue-700 mb-2">Current: {cumulativeGPA.toFixed(2)}</p>
                  <Progress value={(cumulativeGPA / 3.5) * 100} className="h-2" />
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Graduation Timeline</h4>
                  <p className="text-sm text-green-700">Expected: Spring 2026</p>
                  <p className="text-xs text-green-600 mt-1">On track with current progress</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Dean's List Eligibility</h4>
                  <p className="text-sm text-purple-700">Requires 3.5+ GPA</p>
                  <p className="text-xs text-purple-600 mt-1">
                    {cumulativeGPA >= 3.5 ? 'Eligible ✅' : `Need ${(3.5 - cumulativeGPA).toFixed(2)} more points`}
                  </p>
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

export default Grades;