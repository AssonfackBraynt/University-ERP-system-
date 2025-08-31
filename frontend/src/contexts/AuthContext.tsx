import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
  updateLastActivity: () => void;
  sessionTimeRemaining: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = {
  'student@university.edu': {
    id: '1',
    email: 'student@university.edu',
    name: 'John Smith',
    role: UserRole.STUDENT,
    department: 'Computer Science',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    studentId: 'STU2024001',
    avatar: '/api/placeholder/32/32',
    mfaEnabled: true,
    permissions: ['view_courses', 'view_grades', 'pay_fees', 'view_attendance']
  },
  'instructor@university.edu': {
    id: '2',
    email: 'instructor@university.edu',
    name: 'Dr. Sarah Johnson',
    role: UserRole.INSTRUCTOR,
    department: 'Computer Science',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    employeeId: 'INS2024001',
    avatar: '/api/placeholder/32/32',
    mfaEnabled: true,
    permissions: ['view_courses', 'manage_courses', 'grade_students', 'take_attendance', 'view_students']
  },
  'admin@university.edu': {
    id: '3',
    email: 'admin@university.edu',
    name: 'Michael Davis',
    role: UserRole.ADMIN,
    department: 'Administration',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
    employeeId: 'ADM2024001',
    avatar: '/api/placeholder/32/32',
    mfaEnabled: true,
    permissions: ['*'] // Admin has all permissions
  }
};

// Role-based permissions mapping
const rolePermissions: Record<string, string[]> = {
  student: [
    'view_courses',
    'view_grades',
    'view_attendance',
    'pay_fees',
    'view_timetable',
    'download_transcript',
    'register_courses'
  ],
  instructor: [
    'view_courses',
    'manage_courses',
    'view_students',
    'grade_students',
    'take_attendance',
    'schedule_exams',
    'publish_results',
    'view_analytics'
  ],
  staff: [
    'view_courses',
    'manage_users',
    'view_reports',
    'manage_facilities',
    'view_analytics'
  ],
  admin: ['*'] // All permissions
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(3600); // 1 hour in seconds
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Session timeout management
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = (now - lastActivity) / 1000;
      const remaining = Math.max(0, 3600 - timeSinceLastActivity);
      
      setSessionTimeRemaining(remaining);
      
      if (remaining <= 0 && user) {
        logout();
        alert('Session expired. Please log in again.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivity, user]);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const storedUser = localStorage.getItem('user');
      const sessionExpiry = localStorage.getItem('sessionExpiry');
      
      if (storedUser && sessionExpiry) {
        const now = Date.now();
        if (now < parseInt(sessionExpiry)) {
          setUser(JSON.parse(storedUser));
          setLastActivity(now);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('sessionExpiry');
        }
      }
      setIsLoading(false);
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (mockUser && password === 'password123') {
      const sessionExpiry = Date.now() + (3600 * 1000); // 1 hour
      
      setUser(mockUser);
      setLastActivity(Date.now());
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('sessionExpiry', sessionExpiry.toString());
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setSessionTimeRemaining(3600);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    // Check if user has specific permission
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('*');
  };

  const updateLastActivity = () => {
    setLastActivity(Date.now());
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    updateLastActivity,
    sessionTimeRemaining
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;