// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../contexts/AuthContext';
import { PermissionGuard } from '../auth';
import { Badge } from '../ui';
import { UserRole } from '../../types';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: number;
  children?: NavigationItem[];
  roles: UserRole[];
  permission?: string;
}

interface SidebarProps {
  activeSection?: string;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: (href: string, id: string) => void;
  onMobileClose?: () => void;
  className?: string;
}

const navigationItems: NavigationItem[] = [
  // Student Navigation
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
      </svg>
    ),
    href: '/dashboard',
    roles: [UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN]
  },
  {
    id: 'courses',
    label: 'My Courses',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    href: '/dashboard/student/courses',
    roles: [UserRole.STUDENT, UserRole.INSTRUCTOR],
    badge: 5,
    children: [
      {
        id: 'enrolled-courses',
        label: 'Enrolled Courses',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/courses/enrolled',
        roles: [UserRole.STUDENT]
      },
      {
        id: 'course-registration',
        label: 'Course Registration',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/courses/registration',
        roles: [UserRole.STUDENT]
      },
      {
        id: 'assigned-courses',
        label: 'Assigned Courses',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/instructor/courses/assigned',
        roles: [UserRole.INSTRUCTOR]
      },
      {
        id: 'course-content',
        label: 'Course Content',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/instructor/courses/content',
        roles: [UserRole.INSTRUCTOR]
      }
    ]
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: '/dashboard/student/timetable',
    roles: [UserRole.STUDENT, UserRole.INSTRUCTOR]
  },
  {
    id: 'grades',
    label: 'Grades & Performance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/dashboard/student/grades',
    roles: [UserRole.STUDENT],
    children: [
      {
        id: 'current-grades',
        label: 'Current Grades',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/grades/current',
        roles: [UserRole.STUDENT]
      },
      {
        id: 'transcripts',
        label: 'Transcripts',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/grades/transcripts',
        roles: [UserRole.STUDENT]
      }
    ]
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '/dashboard/student/attendance',
    roles: [UserRole.STUDENT, UserRole.INSTRUCTOR]
  },
  {
    id: 'exams',
    label: 'Exams',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    href: '/dashboard/student/exams',
    roles: [UserRole.STUDENT, UserRole.INSTRUCTOR],
    badge: 3
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    href: '/dashboard/student/finance',
    roles: [UserRole.STUDENT],
    badge: 1,
    children: [
      {
        id: 'fee-management',
        label: 'Fee Management',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/finance/fees',
        roles: [UserRole.STUDENT]
      },
      {
        id: 'payment-history',
        label: 'Payment History',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/student/finance/payments',
        roles: [UserRole.STUDENT]
      }
    ]
  },
  // Instructor Navigation
  {
    id: 'students',
    label: 'Student Management',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    href: '/dashboard/instructor/students',
    roles: [UserRole.INSTRUCTOR]
  },
  {
    id: 'assessments',
    label: 'Assessments',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    href: '/dashboard/instructor/assessments',
    roles: [UserRole.INSTRUCTOR],
    badge: 5
  },
  // Admin Navigation
  {
    id: 'academic-management',
    label: 'Academic Management',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    href: '/dashboard/admin/academic',
    roles: [UserRole.ADMIN],
    children: [
      {
        id: 'course-management',
        label: 'Course Management',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/admin/academic/courses',
        roles: [UserRole.ADMIN]
      },
      {
        id: 'program-management',
        label: 'Program Management',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/admin/academic/programs',
        roles: [UserRole.ADMIN]
      },
      {
        id: 'exam-administration',
        label: 'Exam Administration',
        icon: <div className="w-2 h-2 bg-current rounded-full" />,
        href: '/dashboard/admin/academic/exams',
        roles: [UserRole.ADMIN]
      }
    ]
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    href: '/dashboard/admin/users',
    roles: [UserRole.ADMIN]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/dashboard/admin/reports',
    roles: [UserRole.ADMIN]
  }
];

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  isCollapsed = false,
  isMobileOpen = false,
  onToggleCollapse,
  onNavigate,
  onMobileClose,
  className
}) => {
  const { user, hasPermission } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role) && (!item.permission || hasPermission(item.permission))
  );

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const isActive = activeSection === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const filteredChildren = item.children?.filter(child => 
      user && child.roles.includes(user.role) && (!child.permission || hasPermission(child.permission))
    );

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.href && onNavigate) {
              onNavigate(item.href, item.id);
            }
          }}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            level > 0 && 'ml-4',
            isActive
              ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          )}
        >
          <div className="flex items-center space-x-3">
            <div className={cn(
              'flex-shrink-0',
              isActive ? 'text-primary-600' : 'text-slate-400'
            )}>
              {item.icon}
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <span className="truncate">{item.label}</span>
            )}
          </div>
          
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex items-center space-x-2">
              {item.badge && item.badge > 0 && (
                <Badge variant="error" size="sm">
                  {item.badge > 99 ? '99+' : item.badge}
                </Badge>
              )}
              {hasChildren && (
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isExpanded ? 'rotate-90' : ''
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          )}
        </button>
        
        {/* Children */}
        {(!isCollapsed || isMobileOpen) && hasChildren && isExpanded && filteredChildren && (
          <div className="mt-1 space-y-1">
            {filteredChildren.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn(
      'bg-white border-r border-slate-200 flex flex-col transition-all duration-300',
      // Desktop behavior - fixed positioning from very top
      'hidden md:flex fixed top-0 bottom-0 left-0 z-40',
      isCollapsed ? 'md:w-16' : 'md:w-64',
      // Mobile behavior - full height overlay
      isMobileOpen ? 'flex w-64 inset-y-0' : 'hidden md:flex',
      className
    )}>
      {/* University Header */}
      <div className="p-4 border-b border-slate-200 bg-primary-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-bold text-sm">EUE</span>
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div>
              <h2 className="text-sm font-semibold truncate">Evergreen University</h2>
              <p className="text-xs text-primary-100 truncate">of Excellence</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {(!isCollapsed || isMobileOpen) && (
            <h2 className="text-lg font-semibold text-slate-900">Navigation</h2>
          )}
          <button
            onClick={isMobileOpen ? onMobileClose : onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {isMobileOpen ? (
              // Close icon for mobile
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Collapse/expand icon for desktop
              <svg
                className={cn(
                  'w-5 h-5 text-slate-500 transition-transform',
                  isCollapsed ? 'rotate-180' : ''
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map(item => renderNavigationItem(item))}
      </nav>

      {/* Help Link */}
      <div className="p-4 border-t border-slate-200">
        <button className={cn(
          'w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors',
          isCollapsed && 'justify-center'
        )}>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {(!isCollapsed || isMobileOpen) && <span>Need help?</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;