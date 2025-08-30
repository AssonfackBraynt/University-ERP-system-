import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  School,
  Menu,
  X,
  ChevronDown,
  Building,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Send
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    tel: '',
    email: '',
    topic: 'General Inquiry',
    message: ''
  });

  const academicsData = {
    faculties: [
      { name: 'Faculty of Engineering', icon: Building, color: 'text-blue-600' },
      { name: 'Faculty of Business', icon: Building, color: 'text-green-600' },
      { name: 'Faculty of Arts & Sciences', icon: Building, color: 'text-purple-600' },
      { name: 'Faculty of Medicine', icon: Building, color: 'text-red-600' }
    ],
    schools: [
      { name: 'Graduate School', icon: School, color: 'text-indigo-600' },
      { name: 'School of Continuing Education', icon: School, color: 'text-orange-600' }
    ],
    resources: [
      { name: 'Academic Calendar', icon: Calendar, color: 'text-teal-600' },
      { name: 'Course Catalog', icon: FileText, color: 'text-gray-600' },
      { name: 'Academic Policies', icon: FileText, color: 'text-gray-600' }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Evergreen University of Excellence</h1>
                <p className="text-sm text-gray-500">Online Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/programs" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Programs
              </Link>
              
              {/* Academics Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAcademicsOpen(!isAcademicsOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  <span>Academics</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isAcademicsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isAcademicsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Faculties */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Faculties</h3>
                          <div className="space-y-2">
                            {academicsData.faculties.map((faculty, index) => (
                              <a key={index} href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <faculty.icon className={`w-5 h-5 ${faculty.color}`} />
                                <span className="text-sm text-gray-700">{faculty.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                        
                        {/* Schools */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Schools</h3>
                          <div className="space-y-2">
                            {academicsData.schools.map((school, index) => (
                              <a key={index} href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <school.icon className={`w-5 h-5 ${school.color}`} />
                                <span className="text-sm text-gray-700">{school.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                        
                        {/* Academic Resources */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                          <div className="space-y-2">
                            {academicsData.resources.map((resource, index) => (
                              <a key={index} href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <resource.icon className={`w-5 h-5 ${resource.color}`} />
                                <span className="text-sm text-gray-700">{resource.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Admissions
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                About Us
              </a>
              <Link to="/contact" className="text-primary-600 font-medium">
                Contact
              </Link>
              <Link to="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Login
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </Link>
                <Link to="/programs" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Programs
                </Link>
                
                {/* Mobile Academics */}
                <div>
                  <button
                    onClick={() => setIsAcademicsOpen(!isAcademicsOpen)}
                    className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 font-medium"
                  >
                    <span>Academics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isAcademicsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isAcademicsOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <div className="text-sm font-medium text-gray-500 mb-2">Faculties</div>
                      {academicsData.faculties.map((faculty, index) => (
                        <a key={index} href="#" className="block text-sm text-gray-600 hover:text-primary-600 py-1">
                          {faculty.name}
                        </a>
                      ))}
                      
                      <div className="text-sm font-medium text-gray-500 mb-2 mt-4">Schools</div>
                      {academicsData.schools.map((school, index) => (
                        <a key={index} href="#" className="block text-sm text-gray-600 hover:text-primary-600 py-1">
                          {school.name}
                        </a>
                      ))}
                      
                      <div className="text-sm font-medium text-gray-500 mb-2 mt-4">Resources</div>
                      {academicsData.resources.map((resource, index) => (
                        <a key={index} href="#" className="block text-sm text-gray-600 hover:text-primary-600 py-1">
                          {resource.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                <a href="#" className="block text-gray-700 hover:text-primary-600 font-medium">
                  Admissions
                </a>
                <a href="#" className="block text-gray-700 hover:text-primary-600 font-medium">
                  About Us
                </a>
                <Link to="/contact" className="block text-primary-600 font-medium">
                  Contact
                </Link>
                <Link to="/login" className="block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-center">
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">Address</h2>
              <div className="text-blue-600">
                <p className="font-medium">Evergreen University of Excellence</p>
                <p>Avenue Kennedy, Quartier Bastos</p>
                <p>BP 8390, Yaoundé, Cameroon</p>
              </div>
            </div>

            {/* Phone */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">Tel</h2>
              <div className="flex items-center space-x-2 text-blue-600">
                <Phone className="w-5 h-5" />
                <span>+237 677232441</span>
              </div>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">E-mail</h2>
              <div className="flex items-center space-x-2 text-blue-600">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@eue.edu.cm" className="hover:underline">
                  info@eue.edu.cm
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form and FAQ */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">Frequently Asked Questions</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>📋 Frequently Asked Questions</span>
              </button>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name Surname
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                      Tel
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                        🇨🇲 +237
                      </span>
                      <input
                        type="tel"
                        id="tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Academic Programs">Academic Programs</option>
                    <option value="Student Services">Student Services</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;