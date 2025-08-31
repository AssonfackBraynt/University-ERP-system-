import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff, Lock, Mail, BookOpen, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || getDashboardRoute(user.role);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'student':
        return '/dashboard/student';
      case 'instructor':
        return '/dashboard/instructor';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        // Redirect will be handled by useEffect
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again later.');
    }
  };

  const handleContactAdmin = () => {
    // Redirect to email client
    window.location.href = 'mailto:admin@excellence.edu?subject=Account%20Creation%20Request&body=Hello%20Administrator,%0D%0A%0D%0AI%20would%20like%20to%20request%20an%20account%20for%20the%20EduERP%20Portal.%0D%0A%0D%0APlease%20find%20my%20details%20below:%0D%0A%0D%0AName:%0D%0ARole%20(Student/Instructor/Staff):%0D%0ADepartment:%0D%0APhone%20Number:%0D%0AAdditional%20Information:%0D%0A%0D%0AThank%20you.';
  };

  const handleForgotPassword = () => {
    // Redirect to email client for password reset
    window.location.href = 'mailto:admin@excellence.edu?subject=Password%20Reset%20Request&body=Hello%20Administrator,%0D%0A%0D%0AI%20need%20to%20reset%20my%20password%20for%20the%20EduERP%20Portal.%0D%0A%0D%0AMy%20registered%20email:%0D%0A%0D%0AThank%20you.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduERP Portal</h1>
                <p className="text-sm text-gray-500">Educational Management System</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>Student:</strong> student@university.edu / password123</div>
                <div><strong>Instructor:</strong> instructor@university.edu / password123</div>
                <div><strong>Admin:</strong> admin@university.edu / password123</div>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Institution Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="your.email@institution.edu"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 text-center">
                  Use your institution email and password provided by admin
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Contact Administrator */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need an account?{' '}
                <button
                  onClick={handleContactAdmin}
                  className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Contact Administrator
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Icons Footer */}
      <div className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Academic</h3>
              <p className="text-sm text-gray-600 mt-1">Course & Grade Management</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">HR Management</h3>
              <p className="text-sm text-gray-600 mt-1">Staff & Employee Records</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
              <p className="text-sm text-gray-600 mt-1">Fees & Financial Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;