import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
// Select component not available - using native select elements
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Download, FileText, Award, Calendar, GraduationCap, TrendingUp, Printer, Mail } from 'lucide-react';

interface CourseRecord {
  id: string;
  semester: string;
  year: number;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  instructor: string;
}

interface SemesterSummary {
  semester: string;
  year: number;
  courses: CourseRecord[];
  semesterGPA: number;
  semesterCredits: number;
  cumulativeGPA: number;
  cumulativeCredits: number;
}

interface AcademicSummary {
  studentId: string;
  studentName: string;
  program: string;
  major: string;
  minor?: string;
  admissionDate: string;
  expectedGraduation: string;
  currentStatus: 'active' | 'graduated' | 'on-leave' | 'suspended';
  overallGPA: number;
  totalCredits: number;
  creditsRequired: number;
}

const Transcripts: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'official' | 'unofficial'>('unofficial');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const academicSummary: AcademicSummary = {
    studentId: 'STU2024001',
    studentName: 'John Smith',
    program: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    admissionDate: 'September 2022',
    expectedGraduation: 'May 2026',
    currentStatus: 'active',
    overallGPA: 3.45,
    totalCredits: 45,
    creditsRequired: 120
  };

  const transcriptData: SemesterSummary[] = [
    {
      semester: 'Fall',
      year: 2023,
      semesterGPA: 3.6,
      semesterCredits: 15,
      cumulativeGPA: 3.45,
      cumulativeCredits: 45,
      courses: [
        {
          id: '1',
          semester: 'Fall',
          year: 2023,
          courseCode: 'CS301',
          courseName: 'Data Structures and Algorithms',
          credits: 4,
          grade: 'B+',
          gradePoints: 3.3,
          instructor: 'Dr. Sarah Johnson'
        },
        {
          id: '2',
          semester: 'Fall',
          year: 2023,
          courseCode: 'MATH301',
          courseName: 'Calculus III',
          credits: 4,
          grade: 'A-',
          gradePoints: 3.7,
          instructor: 'Dr. Robert Kim'
        },
        {
          id: '3',
          semester: 'Fall',
          year: 2023,
          courseCode: 'PHYS201',
          courseName: 'Physics II',
          credits: 4,
          grade: 'B',
          gradePoints: 3.0,
          instructor: 'Dr. Maria Garcia'
        },
        {
          id: '4',
          semester: 'Fall',
          year: 2023,
          courseCode: 'ENG201',
          courseName: 'Advanced Writing',
          credits: 3,
          grade: 'A',
          gradePoints: 4.0,
          instructor: 'Prof. Sarah Thompson'
        }
      ]
    },
    {
      semester: 'Spring',
      year: 2023,
      semesterGPA: 3.4,
      semesterCredits: 15,
      cumulativeGPA: 3.35,
      cumulativeCredits: 30,
      courses: [
        {
          id: '5',
          semester: 'Spring',
          year: 2023,
          courseCode: 'CS201',
          courseName: 'Computer Programming II',
          credits: 4,
          grade: 'B+',
          gradePoints: 3.3,
          instructor: 'Prof. Michael Davis'
        },
        {
          id: '6',
          semester: 'Spring',
          year: 2023,
          courseCode: 'MATH201',
          courseName: 'Linear Algebra',
          credits: 3,
          grade: 'A-',
          gradePoints: 3.7,
          instructor: 'Prof. Michael Chen'
        },
        {
          id: '7',
          semester: 'Spring',
          year: 2023,
          courseCode: 'PHYS101',
          courseName: 'Physics I',
          credits: 4,
          grade: 'B',
          gradePoints: 3.0,
          instructor: 'Dr. James Wilson'
        },
        {
          id: '8',
          semester: 'Spring',
          year: 2023,
          courseCode: 'ENG102',
          courseName: 'Technical Writing',
          credits: 2,
          grade: 'A',
          gradePoints: 4.0,
          instructor: 'Dr. Emily Rodriguez'
        },
        {
          id: '9',
          semester: 'Spring',
          year: 2023,
          courseCode: 'HIST101',
          courseName: 'World History',
          credits: 2,
          grade: 'B+',
          gradePoints: 3.3,
          instructor: 'Prof. David Lee'
        }
      ]
    },
    {
      semester: 'Fall',
      year: 2022,
      semesterGPA: 3.2,
      semesterCredits: 15,
      cumulativeGPA: 3.2,
      cumulativeCredits: 15,
      courses: [
        {
          id: '10',
          semester: 'Fall',
          year: 2022,
          courseCode: 'CS101',
          courseName: 'Introduction to Programming',
          credits: 4,
          grade: 'B+',
          gradePoints: 3.3,
          instructor: 'Dr. Lisa Anderson'
        },
        {
          id: '11',
          semester: 'Fall',
          year: 2022,
          courseCode: 'MATH101',
          courseName: 'Calculus I',
          credits: 4,
          grade: 'B',
          gradePoints: 3.0,
          instructor: 'Prof. Jennifer White'
        },
        {
          id: '12',
          semester: 'Fall',
          year: 2022,
          courseCode: 'ENG101',
          courseName: 'English Composition',
          credits: 3,
          grade: 'A-',
          gradePoints: 3.7,
          instructor: 'Dr. Mark Brown'
        },
        {
          id: '13',
          semester: 'Fall',
          year: 2022,
          courseCode: 'CHEM101',
          courseName: 'General Chemistry',
          credits: 4,
          grade: 'B-',
          gradePoints: 2.7,
          instructor: 'Dr. Susan Taylor'
        }
      ]
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = selectedSemester === 'all' 
    ? transcriptData 
    : transcriptData.filter(sem => `${sem.semester.toLowerCase()}${sem.year}` === selectedSemester);

  const handleDownload = (type: 'pdf' | 'print') => {
    if (type === 'pdf') {
      alert('Official transcript PDF will be downloaded. This may take a few moments.');
    } else {
      alert('Transcript will be sent to printer.');
    }
  };

  const handleEmailTranscript = () => {
    alert('Official transcript will be emailed to your registered email address.');
  };

  return (
    <DashboardLayout activeSection="grades">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Academic Transcripts</h1>
            <p className="text-gray-600 mt-2">View and download your official academic records</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 bg-white"
            >
              <option value="all">All Semesters</option>
              <option value="fall2023">Fall 2023</option>
              <option value="spring2023">Spring 2023</option>
              <option value="fall2022">Fall 2022</option>
            </select>
            <Button
              variant={selectedView === 'unofficial' ? 'primary' : 'outline'}
              onClick={() => setSelectedView('unofficial')}
            >
              Unofficial
            </Button>
            <Button
              variant={selectedView === 'official' ? 'primary' : 'outline'}
              onClick={() => setSelectedView('official')}
            >
              Official
            </Button>
          </div>
        </div>

        {/* Academic Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Academic Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Student Information</p>
                  <p className="font-semibold">{academicSummary.studentName}</p>
                  <p className="text-sm text-gray-500">ID: {academicSummary.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={getStatusColor(academicSummary.currentStatus)}>
                    {academicSummary.currentStatus.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Program</p>
                  <p className="font-semibold">{academicSummary.program}</p>
                  <p className="text-sm text-gray-500">Major: {academicSummary.major}</p>
                  {academicSummary.minor && (
                    <p className="text-sm text-gray-500">Minor: {academicSummary.minor}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Academic Dates</p>
                  <p className="text-sm">Admitted: {academicSummary.admissionDate}</p>
                  <p className="text-sm">Expected Graduation: {academicSummary.expectedGraduation}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Academic Standing</p>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-600" />
                    <span className="text-2xl font-bold">{academicSummary.overallGPA}</span>
                    <span className="text-sm text-gray-500">GPA</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {academicSummary.totalCredits} / {academicSummary.creditsRequired} Credits
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedView === 'official' && (
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => handleDownload('pdf')} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </Button>
                <Button variant="outline" onClick={() => handleDownload('print')} className="flex items-center space-x-2">
                  <Printer className="h-4 w-4" />
                  <span>Print Transcript</span>
                </Button>
                <Button variant="outline" onClick={handleEmailTranscript} className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Transcript</span>
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Official transcripts include the university seal and registrar's signature. Processing may take 1-2 business days.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Transcript Data */}
        <div className="space-y-6">
          {filteredData.map((semesterData) => (
            <Card key={`${semesterData.semester}${semesterData.year}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    {semesterData.semester} {semesterData.year}
                  </CardTitle>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Semester GPA</p>
                    <p className="text-2xl font-bold">{semesterData.semesterGPA.toFixed(2)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Semester Credits</p>
                    <p className="font-semibold">{semesterData.semesterCredits}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cumulative GPA</p>
                    <p className="font-semibold">{semesterData.cumulativeGPA.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cumulative Credits</p>
                    <p className="font-semibold">{semesterData.cumulativeCredits}</p>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDetails(showDetails === `${semesterData.semester}${semesterData.year}` ? null : `${semesterData.semester}${semesterData.year}`)}
                    >
                      {showDetails === `${semesterData.semester}${semesterData.year}` ? 'Hide' : 'Show'} Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {showDetails === `${semesterData.semester}${semesterData.year}` && (
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Course Code</th>
                          <th className="text-left p-3">Course Name</th>
                          <th className="text-left p-3">Instructor</th>
                          <th className="text-center p-3">Credits</th>
                          <th className="text-center p-3">Grade</th>
                          <th className="text-center p-3">Grade Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semesterData.courses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{course.courseCode}</td>
                            <td className="p-3">{course.courseName}</td>
                            <td className="p-3 text-gray-600">{course.instructor}</td>
                            <td className="p-3 text-center">{course.credits}</td>
                            <td className="p-3 text-center">
                              <span className={`font-semibold ${getGradeColor(course.grade)}`}>
                                {course.grade}
                              </span>
                            </td>
                            <td className="p-3 text-center">{course.gradePoints.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 font-semibold">
                          <td colSpan={3} className="p-3">Semester Totals</td>
                          <td className="p-3 text-center">{semesterData.semesterCredits}</td>
                          <td className="p-3 text-center">GPA</td>
                          <td className="p-3 text-center">{semesterData.semesterGPA.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* GPA Calculation Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Grade Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm">
              <div className="text-center">
                <p className="font-semibold text-green-600">A</p>
                <p className="text-gray-600">4.0</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-green-600">A-</p>
                <p className="text-gray-600">3.7</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-blue-600">B+</p>
                <p className="text-gray-600">3.3</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-blue-600">B</p>
                <p className="text-gray-600">3.0</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-blue-600">B-</p>
                <p className="text-gray-600">2.7</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-yellow-600">C+</p>
                <p className="text-gray-600">2.3</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-yellow-600">C</p>
                <p className="text-gray-600">2.0</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-red-600">F</p>
                <p className="text-gray-600">0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedView === 'official' && (
          <div className="text-center text-sm text-gray-500 border-t pt-4">
            <p>This is an official academic transcript issued by the University Registrar's Office.</p>
            <p>Document generated on {new Date().toLocaleDateString()} • Transcript ID: TR-{Date.now()}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transcripts;