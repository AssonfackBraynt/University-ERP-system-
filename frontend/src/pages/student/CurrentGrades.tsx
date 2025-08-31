import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
// Select component not available - using native select elements
import DashboardLayout from '../../components/layout/DashboardLayout';
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, Target, BarChart3 } from 'lucide-react';

interface Assignment {
  id: string;
  name: string;
  type: 'exam' | 'quiz' | 'assignment' | 'project' | 'participation';
  score: number;
  maxScore: number;
  weight: number;
  dueDate: string;
  submittedDate?: string;
  feedback?: string;
}

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  currentGrade: number;
  letterGrade: string;
  gpa: number;
  assignments: Assignment[];
  gradeDistribution: {
    exams: number;
    quizzes: number;
    assignments: number;
    projects: number;
    participation: number;
  };
}

const CurrentGrades: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('spring2024');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const courses: Course[] = [
    {
      id: '1',
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Johnson',
      credits: 4,
      currentGrade: 87.5,
      letterGrade: 'B+',
      gpa: 3.3,
      gradeDistribution: {
        exams: 40,
        quizzes: 20,
        assignments: 25,
        projects: 10,
        participation: 5
      },
      assignments: [
        {
          id: '1',
          name: 'Midterm Exam',
          type: 'exam',
          score: 85,
          maxScore: 100,
          weight: 20,
          dueDate: '2024-02-15',
          submittedDate: '2024-02-15',
          feedback: 'Good understanding of algorithms, minor issues with complexity analysis.'
        },
        {
          id: '2',
          name: 'Array Implementation',
          type: 'assignment',
          score: 92,
          maxScore: 100,
          weight: 12.5,
          dueDate: '2024-02-01',
          submittedDate: '2024-01-31',
          feedback: 'Excellent implementation with proper error handling.'
        },
        {
          id: '3',
          name: 'Quiz 1: Big O Notation',
          type: 'quiz',
          score: 88,
          maxScore: 100,
          weight: 10,
          dueDate: '2024-01-25',
          submittedDate: '2024-01-25'
        },
        {
          id: '4',
          name: 'Binary Search Tree Project',
          type: 'project',
          score: 0,
          maxScore: 100,
          weight: 10,
          dueDate: '2024-03-01'
        }
      ]
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Linear Algebra',
      instructor: 'Prof. Michael Chen',
      credits: 3,
      currentGrade: 92.3,
      letterGrade: 'A-',
      gpa: 3.7,
      gradeDistribution: {
        exams: 50,
        quizzes: 20,
        assignments: 25,
        projects: 0,
        participation: 5
      },
      assignments: [
        {
          id: '5',
          name: 'Midterm Exam',
          type: 'exam',
          score: 94,
          maxScore: 100,
          weight: 25,
          dueDate: '2024-02-20',
          submittedDate: '2024-02-20',
          feedback: 'Excellent work on matrix operations and eigenvalues.'
        },
        {
          id: '6',
          name: 'Matrix Multiplication HW',
          type: 'assignment',
          score: 96,
          maxScore: 100,
          weight: 12.5,
          dueDate: '2024-01-30',
          submittedDate: '2024-01-29'
        },
        {
          id: '7',
          name: 'Quiz 2: Determinants',
          type: 'quiz',
          score: 90,
          maxScore: 100,
          weight: 10,
          dueDate: '2024-02-05',
          submittedDate: '2024-02-05'
        }
      ]
    },
    {
      id: '3',
      code: 'ENG102',
      name: 'Technical Writing',
      instructor: 'Dr. Emily Rodriguez',
      credits: 2,
      currentGrade: 89.2,
      letterGrade: 'B+',
      gpa: 3.3,
      gradeDistribution: {
        exams: 0,
        quizzes: 10,
        assignments: 60,
        projects: 25,
        participation: 5
      },
      assignments: [
        {
          id: '8',
          name: 'Research Paper Draft',
          type: 'assignment',
          score: 88,
          maxScore: 100,
          weight: 30,
          dueDate: '2024-02-10',
          submittedDate: '2024-02-09',
          feedback: 'Well-structured paper with good citations. Work on conclusion.'
        },
        {
          id: '9',
          name: 'Technical Report',
          type: 'project',
          score: 91,
          maxScore: 100,
          weight: 25,
          dueDate: '2024-01-28',
          submittedDate: '2024-01-27'
        }
      ]
    }
  ];

  const semesters = [
    { value: 'spring2024', label: 'Spring 2024' },
    { value: 'fall2023', label: 'Fall 2023' },
    { value: 'summer2023', label: 'Summer 2023' }
  ];

  const calculateSemesterGPA = () => {
    const totalPoints = courses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'quiz': return 'bg-blue-100 text-blue-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      case 'participation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateWeightedScore = (assignments: Assignment[]) => {
    const completedAssignments = assignments.filter(a => a.score > 0);
    const totalWeight = completedAssignments.reduce((sum, a) => sum + a.weight, 0);
    const weightedSum = completedAssignments.reduce((sum, a) => sum + (a.score / a.maxScore) * a.weight, 0);
    return totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;
  };

  return (
    <DashboardLayout activeSection="grades">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Current Grades</h1>
            <p className="text-gray-600 mt-2">Track your academic performance and assignment scores</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-40 bg-white"
            >
              {semesters.map(sem => (
                <option key={sem.value} value={sem.value}>
                  {sem.label}
                </option>
              ))}
            </select>
            <Button
              variant={viewMode === 'overview' ? 'primary' : 'outline'}
              onClick={() => setViewMode('overview')}
            >
              Overview
            </Button>
            <Button
              variant={viewMode === 'detailed' ? 'primary' : 'outline'}
              onClick={() => setViewMode('detailed')}
            >
              Detailed
            </Button>
          </div>
        </div>

        {/* Semester Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Semester GPA</p>
                  <p className="text-2xl font-bold">{calculateSemesterGPA()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Courses</p>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Grade</p>
                  <p className="text-2xl font-bold">
                    {(courses.reduce((sum, c) => sum + c.currentGrade, 0) / courses.length).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Credits</p>
                  <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === 'overview' ? (
          /* Overview Mode */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.code}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getGradeColor(course.currentGrade)}`}>
                        {course.currentGrade.toFixed(1)}%
                      </p>
                      <p className="text-sm font-semibold">{course.letterGrade}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Credits: {course.credits}</span>
                      <span>GPA: {course.gpa}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.currentGrade.toFixed(1)}%</span>
                      </div>
                      <Progress value={course.currentGrade} className="h-2" />
                    </div>

                    {selectedCourse === course.id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Recent Assignments</h4>
                          <div className="space-y-2">
                            {course.assignments.slice(0, 3).map((assignment) => (
                              <div key={assignment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <Badge className={getAssignmentTypeColor(assignment.type)}>
                                    {assignment.type}
                                  </Badge>
                                  <span className="text-sm">{assignment.name}</span>
                                </div>
                                <span className={`text-sm font-semibold ${getGradeColor((assignment.score / assignment.maxScore) * 100)}`}>
                                  {assignment.score > 0 ? `${assignment.score}/${assignment.maxScore}` : 'Pending'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Detailed Mode */
          <div className="space-y-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{course.code} - {course.name}</CardTitle>
                      <p className="text-gray-600">{course.instructor} • {course.credits} Credits</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${getGradeColor(course.currentGrade)}`}>
                        {course.currentGrade.toFixed(1)}%
                      </p>
                      <p className="text-lg font-semibold">{course.letterGrade} (GPA: {course.gpa})</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Grade Distribution */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Grade Distribution
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Object.entries(course.gradeDistribution).map(([type, weight]) => (
                          weight > 0 && (
                            <div key={type} className="text-center">
                              <p className="text-sm text-gray-600 capitalize">{type}</p>
                              <p className="text-lg font-semibold">{weight}%</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>

                    {/* Assignments Table */}
                    <div>
                      <h4 className="font-semibold mb-3">All Assignments</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Assignment</th>
                              <th className="text-left p-2">Type</th>
                              <th className="text-center p-2">Score</th>
                              <th className="text-center p-2">Weight</th>
                              <th className="text-center p-2">Due Date</th>
                              <th className="text-center p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.assignments.map((assignment) => (
                              <tr key={assignment.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">
                                  <div>
                                    <p className="font-medium">{assignment.name}</p>
                                    {assignment.feedback && (
                                      <p className="text-xs text-gray-500 mt-1">{assignment.feedback}</p>
                                    )}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <Badge className={getAssignmentTypeColor(assignment.type)}>
                                    {assignment.type}
                                  </Badge>
                                </td>
                                <td className="p-2 text-center">
                                  <span className={`font-semibold ${getGradeColor((assignment.score / assignment.maxScore) * 100)}`}>
                                    {assignment.score > 0 ? `${assignment.score}/${assignment.maxScore}` : '-'}
                                  </span>
                                  {assignment.score > 0 && (
                                    <p className="text-xs text-gray-500">
                                      {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                                    </p>
                                  )}
                                </td>
                                <td className="p-2 text-center">{assignment.weight}%</td>
                                <td className="p-2 text-center">{assignment.dueDate}</td>
                                <td className="p-2 text-center">
                                  {assignment.score > 0 ? (
                                    <Badge className="bg-green-100 text-green-800">Graded</Badge>
                                  ) : (
                                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CurrentGrades;