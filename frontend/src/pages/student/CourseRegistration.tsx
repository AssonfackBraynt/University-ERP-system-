import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
// Select component not available - using native select elements
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Search, Filter, Clock, Users, BookOpen, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  capacity: number;
  enrolled: number;
  schedule: string;
  prerequisites: string[];
  description: string;
  department: string;
  semester: string;
  status: 'available' | 'full' | 'closed' | 'waitlist';
  isEnrolled: boolean;
}

const CourseRegistration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('spring2024');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['CS301', 'MATH201']);
  const [showPrerequisites, setShowPrerequisites] = useState<string | null>(null);

  const availableCourses: Course[] = [
    {
      id: '1',
      code: 'CS302',
      name: 'Database Systems',
      instructor: 'Dr. James Wilson',
      credits: 4,
      capacity: 30,
      enrolled: 25,
      schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
      prerequisites: ['CS301'],
      description: 'Introduction to database design, SQL, and database management systems.',
      department: 'Computer Science',
      semester: 'Spring 2024',
      status: 'available',
      isEnrolled: false
    },
    {
      id: '2',
      code: 'CS401',
      name: 'Software Engineering',
      instructor: 'Prof. Lisa Anderson',
      credits: 3,
      capacity: 25,
      enrolled: 25,
      schedule: 'Tue, Thu 11:00-12:30 PM',
      prerequisites: ['CS301', 'CS302'],
      description: 'Software development methodologies, project management, and team collaboration.',
      department: 'Computer Science',
      semester: 'Spring 2024',
      status: 'full',
      isEnrolled: false
    },
    {
      id: '3',
      code: 'MATH301',
      name: 'Calculus III',
      instructor: 'Dr. Robert Kim',
      credits: 4,
      capacity: 35,
      enrolled: 20,
      schedule: 'Mon, Wed, Fri 1:00-2:00 PM',
      prerequisites: ['MATH201'],
      description: 'Multivariable calculus, partial derivatives, and multiple integrals.',
      department: 'Mathematics',
      semester: 'Spring 2024',
      status: 'available',
      isEnrolled: false
    },
    {
      id: '4',
      code: 'PHYS201',
      name: 'Physics II',
      instructor: 'Dr. Maria Garcia',
      credits: 4,
      capacity: 40,
      enrolled: 32,
      schedule: 'Tue, Thu 2:00-4:00 PM',
      prerequisites: ['PHYS101', 'MATH201'],
      description: 'Electricity, magnetism, and electromagnetic waves.',
      department: 'Physics',
      semester: 'Spring 2024',
      status: 'available',
      isEnrolled: false
    },
    {
      id: '5',
      code: 'ENG201',
      name: 'Advanced Writing',
      instructor: 'Prof. Sarah Thompson',
      credits: 3,
      capacity: 20,
      enrolled: 18,
      schedule: 'Wed, Fri 10:00-11:30 AM',
      prerequisites: ['ENG102'],
      description: 'Advanced composition techniques and research writing.',
      department: 'English',
      semester: 'Spring 2024',
      status: 'available',
      isEnrolled: false
    },
    {
      id: '6',
      code: 'CS303',
      name: 'Computer Networks',
      instructor: 'Dr. Ahmed Hassan',
      credits: 3,
      capacity: 28,
      enrolled: 15,
      schedule: 'Mon, Wed 3:00-4:30 PM',
      prerequisites: ['CS301'],
      description: 'Network protocols, architecture, and distributed systems.',
      department: 'Computer Science',
      semester: 'Spring 2024',
      status: 'available',
      isEnrolled: false
    }
  ];

  const departments = ['all', 'Computer Science', 'Mathematics', 'Physics', 'English'];
  const semesters = [
    { value: 'spring2024', label: 'Spring 2024' },
    { value: 'summer2024', label: 'Summer 2024' },
    { value: 'fall2024', label: 'Fall 2024' }
  ];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'waitlist': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const checkPrerequisites = (prerequisites: string[]) => {
    return prerequisites.every(prereq => enrolledCourses.includes(prereq));
  };

  const handleEnroll = (courseCode: string) => {
    // Simulate enrollment
    alert(`Successfully enrolled in ${courseCode}!`);
  };

  const handleWaitlist = (courseCode: string) => {
    // Simulate waitlist
    alert(`Added to waitlist for ${courseCode}!`);
  };

  return (
    <DashboardLayout activeSection="courses">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Registration</h1>
            <p className="text-gray-600 mt-2">Browse and register for available courses</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Registration Period</p>
            <p className="font-semibold">Jan 15 - Feb 5, 2024</p>
          </div>
        </div>

        {/* Registration Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Available Courses</p>
                  <p className="text-2xl font-bold">{availableCourses.filter(c => c.status === 'available').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Enrolled</p>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Credits Enrolled</p>
                  <p className="text-2xl font-bold">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Max Credits</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses by code, name, or instructor..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
              <select 
                value={selectedSemester} 
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full md:w-48 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {semesters.map(sem => (
                  <option key={sem.value} value={sem.value}>
                    {sem.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Course List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => {
            const prerequisitesMet = checkPrerequisites(course.prerequisites);
            const canEnroll = course.status === 'available' && prerequisitesMet;
            const canWaitlist = course.status === 'full' && prerequisitesMet;

            return (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-xl">{course.code}</CardTitle>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mt-1">{course.name}</h3>
                      <p className="text-gray-600">{course.instructor} • {course.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Credits: {course.credits}</p>
                      <p className="text-sm text-gray-600">
                        Enrolled: {course.enrolled}/{course.capacity}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.capacity - course.enrolled} spots available</span>
                      </div>
                    </div>

                    {course.prerequisites.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {prerequisitesMet ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="text-sm font-medium">
                              Prerequisites {prerequisitesMet ? 'Met' : 'Not Met'}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPrerequisites(showPrerequisites === course.id ? null : course.id)}
                          >
                            {showPrerequisites === course.id ? 'Hide' : 'Show'} Details
                          </Button>
                        </div>
                        
                        {showPrerequisites === course.id && (
                          <div className="mt-2 space-y-1">
                            {course.prerequisites.map((prereq) => (
                              <div key={prereq} className="flex items-center space-x-2 text-sm">
                                {enrolledCourses.includes(prereq) ? (
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-3 w-3 text-red-600" />
                                )}
                                <span className={enrolledCourses.includes(prereq) ? 'text-green-700' : 'text-red-700'}>
                                  {prereq}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      {canEnroll && (
                        <Button onClick={() => handleEnroll(course.code)}>
                          Enroll Now
                        </Button>
                      )}
                      {canWaitlist && (
                        <Button variant="outline" onClick={() => handleWaitlist(course.code)}>
                          Join Waitlist
                        </Button>
                      )}
                      {!prerequisitesMet && (
                        <Button disabled>
                          Prerequisites Required
                        </Button>
                      )}
                      {course.status === 'closed' && (
                        <Button disabled>
                          Registration Closed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseRegistration;