import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { DashboardLayout } from '../../components/layout';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  status: 'Active' | 'Completed';
  description: string;
  schedule: string;
  room: string;
  materials: string[];
  assignments: number;
  announcements: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Sarah Johnson',
    credits: 3,
    status: 'Active',
    description: 'Fundamental concepts of computer science including programming, algorithms, and data structures.',
    schedule: 'Mon, Wed, Fri 10:00-11:00 AM',
    room: 'Room 201',
    materials: ['Textbook: Introduction to CS', 'Lab Manual', 'Online Resources'],
    assignments: 3,
    announcements: 2
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Calculus II',
    instructor: 'Prof. Michael Chen',
    credits: 4,
    status: 'Active',
    description: 'Advanced calculus topics including integration techniques, series, and differential equations.',
    schedule: 'Tue, Thu 2:00-3:30 PM',
    room: 'Room 105',
    materials: ['Calculus Textbook', 'Problem Sets', 'Graphing Calculator'],
    assignments: 5,
    announcements: 1
  },
  {
    id: '3',
    code: 'ENG102',
    name: 'English Composition',
    instructor: 'Dr. Emily Rodriguez',
    credits: 3,
    status: 'Active',
    description: 'Advanced writing skills, research methods, and critical analysis of literature.',
    schedule: 'Mon, Wed 1:00-2:30 PM',
    room: 'Room 301',
    materials: ['Writing Handbook', 'Literary Anthology', 'MLA Style Guide'],
    assignments: 4,
    announcements: 0
  },
  {
    id: '4',
    code: 'HIST101',
    name: 'World History',
    instructor: 'Prof. David Wilson',
    credits: 3,
    status: 'Completed',
    description: 'Survey of world civilizations from ancient times to the present.',
    schedule: 'Completed Spring 2023',
    room: 'Room 150',
    materials: ['History Textbook', 'Primary Sources', 'Maps and Timeline'],
    assignments: 0,
    announcements: 0
  }
];

const MyCourses: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {course.code}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{course.name}</p>
          </div>
          <Badge 
            variant={course.status === 'Active' ? 'default' : 'outline'}
            className={course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
          >
            {course.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Instructor:</span> {course.instructor}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Credits:</span> {course.credits}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Schedule:</span> {course.schedule}
          </p>
        </div>
        
        {course.status === 'Active' && (
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1">
              Materials
              {course.materials.length > 0 && (
                <Badge variant="outline" className="ml-1 text-xs">
                  {course.materials.length}
                </Badge>
              )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <Modal isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedCourse.code} - {selectedCourse.name}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Instructor</h4>
                  <p className="text-gray-600">{selectedCourse.instructor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Credits</h4>
                  <p className="text-gray-600">{selectedCourse.credits}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Schedule</h4>
                  <p className="text-gray-600">{selectedCourse.schedule}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Room</h4>
                  <p className="text-gray-600">{selectedCourse.room}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Course Materials</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCourse.materials.map((material, index) => (
                    <li key={index} className="text-gray-600">{material}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Course Registration Modal */}
      {showRegistration && (
        <Modal isOpen={showRegistration} onClose={() => setShowRegistration(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Course Registration</h2>
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Available courses for registration:
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">PHY101 - Physics I</h4>
                      <p className="text-sm text-gray-600">Dr. James Miller • 4 Credits • Mon, Wed, Fri 9:00-10:00 AM</p>
                      <p className="text-xs text-orange-600 mt-1">Prerequisites: MATH101</p>
                    </div>
                    <Button size="sm" variant="outline">Add Course</Button>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">ART101 - Introduction to Art</h4>
                      <p className="text-sm text-gray-600">Prof. Lisa Anderson • 3 Credits • Tue, Thu 11:00-12:30 PM</p>
                      <p className="text-xs text-green-600 mt-1">No prerequisites</p>
                    </div>
                    <Button size="sm" variant="outline">Add Course</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Modal>
      )}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Assignments
              {course.assignments > 0 && (
                <Badge variant="error" className="ml-1 text-xs">
                  {course.assignments}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Announcements
              {course.announcements > 0 && (
                <Badge variant="error" className="ml-1 text-xs">
                  {course.announcements}
                </Badge>
              )}
            </Button>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-blue-600 hover:text-blue-800"
          onClick={() => setSelectedCourse(course)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  const CourseListItem = ({ course }: { course: Course }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{course.code}</h3>
                <p className="text-sm text-gray-600">{course.name}</p>
              </div>
              <Badge 
                variant={course.status === 'Active' ? 'default' : 'outline'}
                className={course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
              >
                {course.status}
              </Badge>
            </div>
            <div className="flex gap-6 mt-2 text-sm text-gray-600">
              <span><span className="font-medium">Instructor:</span> {course.instructor}</span>
              <span><span className="font-medium">Credits:</span> {course.credits}</span>
              <span><span className="font-medium">Schedule:</span> {course.schedule}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {course.status === 'Active' && (
              <>
                <Button variant="outline" size="sm">
                  Materials
                  {course.materials.length > 0 && (
                    <Badge variant="outline" className="ml-1 text-xs">
                      {course.materials.length}
                    </Badge>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  Assignments
                  {course.assignments > 0 && (
                    <Badge variant="error" className="ml-1 text-xs">
                      {course.assignments}
                    </Badge>
                  )}
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(course)}>
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout activeSection="courses">
      <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage your enrolled courses and access materials</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </Button>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowRegistration(true)}
          >
            Course Registration
          </Button>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{mockCourses.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-green-600">{mockCourses.filter(c => c.status === 'Active').length}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-blue-600">{mockCourses.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.credits, 0)}</p>
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
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-orange-600">{mockCourses.reduce((sum, c) => sum + c.assignments + c.announcements, 0)}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {mockCourses.map(course => (
            <CourseListItem key={course.id} course={course} />
          ))}
        </div>
      )}
      </div>
    </DashboardLayout>
  );
};

export default MyCourses;