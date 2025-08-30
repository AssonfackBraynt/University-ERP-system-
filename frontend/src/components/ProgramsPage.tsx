import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Clock,
  Building,
  GraduationCap,
  Users,
  ArrowRight,
  Menu,
  School,
  FileText,
  Calendar
} from 'lucide-react';

interface Program {
  id: string;
  name: string;
  degreeType: string;
  duration: string;
  department: string;
  faculty: string;
  mediumOfInstruction: string;
  programType: 'Undergraduate' | 'Graduate' | 'Doctoral' | 'Certificate' | 'Diploma';
}

const ProgramsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedProgramTypes, setSelectedProgramTypes] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemsPerPage = 12;

  const academicsData = {
    faculties: [
      'Architecture',
      'Arts & Sciences', 
      'Business & Economics',
      'Communication and Media Studies',
      'Computer and Information Sciences',
      'Dentistry',
      'Education',
      'Engineering',
      'Health Sciences',
      'Law',
      'Medicine',
      'Pharmacy',
      'Tourism'
    ],
    schools: [
      'Computing and Technology',
      'Health Services',
      'Tourism and Hospitality Management',
      'Foreign Languages and English Preparatory School'
    ],
    academicCalendar: [
      'Academic Calendar 2023-2024',
      'Academic Calendar 2024-2025',
      'Exam Schedule',
      'Registration Dates'
    ],
    otherLinks: [
      {
        title: 'Research',
        items: ['Research Centers', 'Publications', 'Conferences']
      },
      {
        title: 'Academic Administration',
        items: ['Registrar', 'Academic Affairs', 'Student Services']
      },
      {
        title: 'OpenCourseWare',
        items: []
      },
      {
        title: 'Staff Search',
        items: []
      },
      {
        title: 'Job Opportunities',
        items: []
      }
    ]
  };

  // Sample program data
  const allPrograms: Program[] = [
    {
      id: '1',
      name: 'Information Technology - Management',
      degreeType: 'Bachelor/B.S.',
      duration: '5 years',
      department: 'Computer and Information Sciences',
      faculty: 'Computer and Information Sciences',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '2',
      name: 'Information Systems Double Major',
      degreeType: 'Bachelor/B.S.',
      duration: '5 years',
      department: 'Computer and Information Sciences',
      faculty: 'Computer and Information Sciences',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '3',
      name: 'Information Technology',
      degreeType: 'Bachelor/B.S.',
      duration: '4 years',
      department: 'Computer and Information Sciences',
      faculty: 'Computer and Information Sciences',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '4',
      name: 'Information Technology Security',
      degreeType: 'Bachelor/B.S.',
      duration: '4 years',
      department: 'Computer and Information Sciences',
      faculty: 'Computer and Information Sciences',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '5',
      name: 'Business Administration',
      degreeType: 'Bachelor/B.S.',
      duration: '4 years',
      department: 'Business Administration',
      faculty: 'Business & Economics',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '6',
      name: 'Civil Engineering',
      degreeType: 'Bachelor/B.S.',
      duration: '4 years',
      department: 'Civil Engineering',
      faculty: 'Engineering',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '7',
      name: 'Architecture',
      degreeType: 'Bachelor/B.S.',
      duration: '5 years',
      department: 'Architecture',
      faculty: 'Architecture',
      mediumOfInstruction: 'English',
      programType: 'Undergraduate'
    },
    {
      id: '8',
      name: 'Medicine',
      degreeType: 'Doctor of Medicine',
      duration: '6 years',
      department: 'Medicine',
      faculty: 'Medicine',
      mediumOfInstruction: 'English',
      programType: 'Doctoral'
    },
    {
      id: '9',
      name: 'Computer Science - Master',
      degreeType: 'Master/M.S.',
      duration: '2 years',
      department: 'Computer and Information Sciences',
      faculty: 'Computer and Information Sciences',
      mediumOfInstruction: 'English',
      programType: 'Graduate'
    },
    {
      id: '10',
      name: 'MBA',
      degreeType: 'Master/MBA',
      duration: '2 years',
      department: 'Business Administration',
      faculty: 'Business & Economics',
      mediumOfInstruction: 'English',
      programType: 'Graduate'
    }
  ];

  const departments = Array.from(new Set(allPrograms.map(p => p.department))).sort();
  const faculties = Array.from(new Set(allPrograms.map(p => p.faculty))).sort();
  const programTypes = ['Undergraduate', 'Graduate', 'Doctoral', 'Certificate', 'Diploma'];
  const mediums = ['English', 'Other Languages'];
  const durations = ['1-2 years', '3-4 years', '5+ years'];

  // Filter programs based on selected criteria
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter(program => {
      const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(program.department);
      const matchesProgramType = selectedProgramTypes.length === 0 || selectedProgramTypes.includes(program.programType);
      const matchesMedium = selectedMediums.length === 0 || selectedMediums.includes(program.mediumOfInstruction);
      const matchesFaculty = selectedFaculties.length === 0 || selectedFaculties.includes(program.faculty);
      
      const matchesDuration = selectedDurations.length === 0 || selectedDurations.some(duration => {
        const years = parseInt(program.duration);
        if (duration === '1-2 years') return years <= 2;
        if (duration === '3-4 years') return years >= 3 && years <= 4;
        if (duration === '5+ years') return years >= 5;
        return false;
      });

      return matchesSearch && matchesDepartment && matchesProgramType && matchesMedium && matchesFaculty && matchesDuration;
    });
  }, [searchTerm, selectedDepartments, selectedProgramTypes, selectedMediums, selectedFaculties, selectedDurations]);

  // Pagination
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrograms = filteredPrograms.slice(startIndex, startIndex + itemsPerPage);

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedProgramTypes([]);
    setSelectedMediums([]);
    setSelectedDurations([]);
    setSelectedFaculties([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const toggleFilter = (value: string, selectedArray: string[], setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter(item => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Evergreen University of Excellence</h1>
                <p className="text-sm text-gray-500">Online Portal</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Home</Link>
              <Link to="/programs" className="text-primary-600 font-medium">Programs</Link>
              
              {/* Academics Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsAcademicsOpen(true)}
                onMouseLeave={() => setIsAcademicsOpen(false)}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  <span>Academics</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAcademicsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mega Menu */}
                {isAcademicsOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-white shadow-xl rounded-lg border border-gray-200 z-50">
                    <div className="p-8">
                      <div className="grid grid-cols-4 gap-8">
                        {/* Faculties */}
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Building className="w-5 h-5 text-primary-600" />
                            <h3 className="font-semibold text-gray-900">Faculties</h3>
                          </div>
                          <ul className="space-y-2">
                            {academicsData.faculties.map((faculty, index) => (
                              <li key={index}>
                                <a href={`#faculty-${faculty.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                                  {faculty}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Schools */}
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <School className="w-5 h-5 text-primary-600" />
                            <h3 className="font-semibold text-gray-900">Schools</h3>
                          </div>
                          <ul className="space-y-2">
                            {academicsData.schools.map((school, index) => (
                              <li key={index}>
                                <a href={`#school-${school.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                                  {school}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Academic Calendar */}
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="w-5 h-5 text-primary-600" />
                            <h3 className="font-semibold text-gray-900">Academic Calendar</h3>
                          </div>
                          <ul className="space-y-2">
                            {academicsData.academicCalendar.map((calendar, index) => (
                              <li key={index}>
                                <a href={`#calendar-${calendar.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                                  {calendar}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Other Academic Links */}
                        <div>
                          <div className="flex items-center space-x-2 mb-4">
                            <FileText className="w-5 h-5 text-primary-600" />
                            <h3 className="font-semibold text-gray-900">Academic Resources</h3>
                          </div>
                          <ul className="space-y-2">
                            {academicsData.otherLinks.map((link, index) => (
                              <li key={index}>
                                <a href={`#${link.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                                  {link.title}
                                </a>
                                {link.items.length > 0 && (
                                  <ul className="ml-3 mt-1 space-y-1">
                                    {link.items.map((item, itemIndex) => (
                                      <li key={itemIndex}>
                                        <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs text-gray-500 hover:text-primary-600 transition-colors">
                                          {item}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="#admissions" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Admissions</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">About Us</a>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="btn-primary"
              >
                Login
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium transition-colors">Home</Link>
                <Link to="/programs" className="block text-primary-600 font-medium">Programs</Link>
                <div>
                  <button 
                    onClick={() => setIsAcademicsOpen(!isAcademicsOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    <span>Academics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isAcademicsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isAcademicsOpen && (
                    <div className="mt-2 pl-4 space-y-2">
                      <div className="text-sm font-medium text-gray-900 mb-2">Faculties</div>
                      {academicsData.faculties.slice(0, 5).map((faculty, index) => (
                        <a key={index} href={`#faculty-${faculty.toLowerCase().replace(/\s+/g, '-')}`} className="block text-sm text-gray-600 hover:text-primary-600 transition-colors">
                          {faculty}
                        </a>
                      ))}
                      <a href="#all-faculties" className="block text-sm text-primary-600 font-medium">View All Faculties</a>
                    </div>
                  )}
                </div>
                <a href="#admissions" className="block text-gray-700 hover:text-primary-600 font-medium transition-colors">Admissions</a>
                <a href="#about" className="block text-gray-700 hover:text-primary-600 font-medium transition-colors">About Us</a>
                <Link to="/contact" className="block text-gray-700 hover:text-primary-600 font-medium transition-colors">Contact</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Programs</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of undergraduate, graduate, and doctoral programs designed to shape future leaders.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-600 hover:text-primary-600"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Programs</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by program name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Program Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Program Type</label>
                  <div className="space-y-2">
                    {programTypes.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProgramTypes.includes(type)}
                          onChange={() => toggleFilter(type, selectedProgramTypes, setSelectedProgramTypes)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Faculty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Faculty</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {faculties.map(faculty => (
                      <label key={faculty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFaculties.includes(faculty)}
                          onChange={() => toggleFilter(faculty, selectedFaculties, setSelectedFaculties)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{faculty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Duration</label>
                  <div className="space-y-2">
                    {durations.map(duration => (
                      <label key={duration} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedDurations.includes(duration)}
                          onChange={() => toggleFilter(duration, selectedDurations, setSelectedDurations)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Medium of Instruction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Medium of Instruction</label>
                  <div className="space-y-2">
                    {mediums.map(medium => (
                      <label key={medium} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMediums.includes(medium)}
                          onChange={() => toggleFilter(medium, selectedMediums, setSelectedMediums)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{medium}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPrograms.length)} of {filteredPrograms.length} programs
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {paginatedPrograms.map(program => (
                <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {program.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-primary-600" />
                        <span className="text-sm font-medium text-primary-600">{program.degreeType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.faculty}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{program.department}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {program.programType}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;