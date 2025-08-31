import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { BookOpen, Clock, Users, FileText, Video, Download } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  progress: number;
  status: 'active' | 'completed' | 'dropped';
  schedule: string;
  materials: Material[];
  assignments: Assignment[];
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  uploadDate: string;
  size?: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

const EnrolledCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const enrolledCourses: Course[] = [
    {
      id: '1',
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Johnson',
      credits: 4,
      progress: 75,
      status: 'active',
      schedule: 'Mon, Wed, Fri 10:00-11:00 AM',
      materials: [
        { id: '1', title: 'Lecture 1: Introduction to Arrays', type: 'pdf', uploadDate: '2024-01-15', size: '2.5 MB' },
        { id: '2', title: 'Video: Sorting Algorithms', type: 'video', uploadDate: '2024-01-18' },
        { id: '3', title: 'Assignment 1 Guidelines', type: 'document', uploadDate: '2024-01-20', size: '1.2 MB' }
      ],
      assignments: [
        { id: '1', title: 'Array Implementation', dueDate: '2024-02-01', status: 'submitted', grade: 85 },
        { id: '2', title: 'Binary Search Tree', dueDate: '2024-02-15', status: 'pending' }
      ]
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Linear Algebra',
      instructor: 'Prof. Michael Chen',
      credits: 3,
      progress: 60,
      status: 'active',
      schedule: 'Tue, Thu 2:00-3:30 PM',
      materials: [
        { id: '4', title: 'Matrix Operations', type: 'pdf', uploadDate: '2024-01-12', size: '3.1 MB' },
        { id: '5', title: 'Eigenvalues and Eigenvectors', type: 'pdf', uploadDate: '2024-01-19', size: '2.8 MB' }
      ],
      assignments: [
        { id: '3', title: 'Matrix Multiplication', dueDate: '2024-01-30', status: 'graded', grade: 92 },
        { id: '4', title: 'Linear Transformations', dueDate: '2024-02-10', status: 'submitted' }
      ]
    },
    {
      id: '3',
      code: 'ENG102',
      name: 'Technical Writing',
      instructor: 'Dr. Emily Rodriguez',
      credits: 2,
      progress: 90,
      status: 'active',
      schedule: 'Wed 1:00-3:00 PM',
      materials: [
        { id: '6', title: 'Writing Guidelines', type: 'document', uploadDate: '2024-01-10', size: '1.5 MB' },
        { id: '7', title: 'Citation Formats', type: 'link', uploadDate: '2024-01-14' }
      ],
      assignments: [
        { id: '5', title: 'Research Paper Draft', dueDate: '2024-02-05', status: 'pending' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'dropped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'link': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout activeSection="courses">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Enrolled Courses</h1>
            <p className="text-gray-600 mt-2">Manage your current semester courses and access materials</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold">{enrolledCourses.filter(c => c.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Credits</p>
                  <p className="text-2xl font-bold">{enrolledCourses.reduce((sum, course) => sum + course.credits, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold">{Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.code}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{course.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                  </div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Credits: {course.credits}</span>
                    <span>{course.schedule}</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {selectedCourse === course.id && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      {/* Course Materials */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Course Materials</h4>
                        <div className="space-y-2">
                          {course.materials.map((material) => (
                            <div key={material.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center space-x-2">
                                {getMaterialIcon(material.type)}
                                <div>
                                  <p className="text-sm font-medium">{material.title}</p>
                                  <p className="text-xs text-gray-500">
                                    {material.uploadDate} {material.size && `• ${material.size}`}
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assignments */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Assignments</h4>
                        <div className="space-y-2">
                          {course.assignments.map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div>
                                <p className="text-sm font-medium">{assignment.title}</p>
                                <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {assignment.grade && (
                                  <span className="text-sm font-semibold">{assignment.grade}%</span>
                                )}
                                <Badge className={getAssignmentStatusColor(assignment.status)}>
                                  {assignment.status}
                                </Badge>
                              </div>
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
      </div>
    </DashboardLayout>
  );
};

export default EnrolledCourses;