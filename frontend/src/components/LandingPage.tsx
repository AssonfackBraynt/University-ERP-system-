import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  DollarSign, 
  Calendar,
  BarChart3,
  Shield,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Building,
  School,
  FileText,
  Search,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      'Academic Calendar 2025-2026',
      'Academic Calendar 2024-2025',
      'Academic Calendar of Medicine',
      'Academic Calendar of English Preparatory School',
      'Academic Calendar of Institute of Graduate Studies and Research'
    ],
    otherLinks: [
      { title: 'Research', items: ['Graduate Studies and Research', 'Library', 'Advanced Technology and Research and Development', 'Distance Education', 'Open Journal Systems'] },
      { title: 'Academic Administration', items: [] },
      { title: 'OpenCourseWare', items: [] },
      { title: 'Staff Search', items: [] },
      { title: 'Academic Job Opportunities', items: ['Full-Time', 'Part-Time'] }
    ]
  };

  const programs = [
    {
      title: "Computer Science",
      description: "Cutting-edge technology education with hands-on programming and software development.",
      icon: <BookOpen className="w-6 h-6 text-primary-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Business Administration", 
      description: "Comprehensive business education covering management, finance and entrepreneurship.",
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Engineering",
      description: "Innovative engineering programs with state-of-the-art labs and industry partnerships.",
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "Liberal Arts",
      description: "Diverse humanities programs fostering critical thinking and creative expression.",
      icon: <Users className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50"
    }
  ];

  const features = [
    {
      title: "Academic Management",
      description: "Streamline course management, grade tracking, exam scheduling, and academic reporting.",
      icon: <BookOpen className="w-8 h-8 text-primary-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Finance & Fees", 
      description: "Automated invoicing, payment processing, financial reporting, and budget management.",
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "HR & Staff Management",
      description: "Employee records, payroll processing, attendance tracking, and performance evaluation.",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50"
    }
  ];

  const stats = [
    { label: "Students", value: "15,000+", color: "text-primary-600" },
    { label: "Faculty Members", value: "500+", color: "text-green-600" },
    { label: "Years of Excellence", value: "50+", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <Link to="/programs" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Programs</Link>
              
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
                <Link to="/programs" className="block text-gray-700 hover:text-primary-600 font-medium transition-colors">Programs</Link>
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl mx-auto mb-8 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary-600">Evergreen University of Excellence</span> Online Portal
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Manage applications, academics, finance, and more – all in one place. Experience seamless digital education management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login"
                className="btn-primary text-lg py-3 px-8"
              >
                Login to Portal
              </Link>
              <Link to="/programs" className="btn-secondary text-lg py-3 px-8">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover world-class programs designed to shape tomorrow's leaders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-200">
                <div className={`w-12 h-12 ${program.color} rounded-xl flex items-center justify-center mb-4`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                <button className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">ERP System Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive management tools for modern educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl mx-auto mb-8 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Evergreen University of Excellence</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Evergreen University of Excellence has been at the forefront of educational innovation for over 50 years. Our 
              commitment to academic excellence, cutting-edge research, and student success has made us a leading 
              institution in higher education. With our modern ERP system, we provide seamless digital experiences for 
              students, faculty, and staff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="card">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">EduERP Portal</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Excellence in education through innovative technology and comprehensive management systems.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#admissions" className="text-gray-400 hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#login" className="text-gray-400 hover:text-white transition-colors">Login</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Apply Now</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">info@excellence.edu</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 cursor-pointer transition-colors">
                  <span className="text-sm font-medium">in</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 Evergreen University of Excellence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;