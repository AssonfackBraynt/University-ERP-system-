// src/components/layout/TopBar.tsx
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Badge, Button } from '../ui';
import { User, UserRole } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PermissionGuard } from '../auth';

interface TopBarProps {
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  onMenuClick?: () => void;
  notificationCount?: number;
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  onMenuClick,
  notificationCount = 0,
  className
}) => {
  const { user, logout, sessionTimeRemaining } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Format session time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'instructor':
        return 'Instructor';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'info' as const;
      case 'instructor':
        return 'success' as const;
      case 'admin':
        return 'error' as const;
      default:
        return 'default' as const;
    }
  };

  return (
    <header className={cn(
      'bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-[60]',
      className
    )}>
      {/* Left Section - Mobile Menu + Logo and Search */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-slate-100 md:hidden transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Institution Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm md:text-lg">U</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-slate-900">Evergreen University of Excellence</h1>
            <p className="text-sm text-slate-600">EUE Portal</p>
          </div>
        </div>

        {/* Global Search - Hidden on mobile */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses, students, announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-80 pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </form>
      </div>

      {/* Right Section - Actions and User Menu */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Mobile Search Button */}
        <button
          onClick={() => onSearch?.('')}
          className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        {/* Quick Actions */}
        <div className="hidden xl:flex items-center space-x-2">
          {user?.role === 'student' && (
            <>
              <PermissionGuard requiredPermission="view_courses">
                <Button variant="ghost" size="sm">My Courses</Button>
              </PermissionGuard>
              <PermissionGuard requiredPermission="pay_fees">
                <Button variant="ghost" size="sm">Pay Fees</Button>
              </PermissionGuard>
            </>
          )}
          {user?.role === 'instructor' && (
            <>
              <PermissionGuard requiredPermission="take_attendance">
                <Button variant="ghost" size="sm">Record Attendance</Button>
              </PermissionGuard>
              <PermissionGuard requiredPermission="grade_students">
                <Button variant="ghost" size="sm">Enter Grades</Button>
              </PermissionGuard>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <PermissionGuard requiredPermission="*">
                <Button variant="ghost" size="sm">Create User</Button>
              </PermissionGuard>
              <PermissionGuard requiredPermission="*">
                <Button variant="ghost" size="sm">Create Course</Button>
              </PermissionGuard>
            </>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              onNotificationClick?.();
            }}
            className="relative p-2 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationCount > 0 && (
              <Badge 
                variant="error" 
                size="sm" 
                className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </Badge>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {/* Sample notifications */}
                <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-900">New assignment posted in Mathematics</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-900">Fee payment reminder</p>
                  <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-slate-200">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <div className="flex items-center space-x-2">
                {user?.role && (
                  <Badge variant={getRoleBadgeVariant(user.role)} size="sm">
                    {getRoleLabel(user.role)}
                  </Badge>
                )}
                {user?.mfaEnabled && (
                  <span className="text-xs text-green-600">🔒</span>
                )}
              </div>
            </div>
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {user?.role && (
                    <Badge variant={getRoleBadgeVariant(user.role)} size="sm">
                      {getRoleLabel(user.role)}
                    </Badge>
                  )}
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-500">
                    {user?.studentId || user?.employeeId}
                  </span>
                </div>
                {user?.mfaEnabled && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-green-600 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      MFA Enabled
                    </span>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Session expires in:</span>
                    <span className={`font-mono ${sessionTimeRemaining < 300 ? 'text-red-600' : 'text-slate-600'}`}>
                      {formatTime(sessionTimeRemaining)}
                    </span>
                  </div>
                  {user?.lastLogin && (
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                      <span>Last login:</span>
                      <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="py-1">
                <button
                  onClick={onProfileClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                
                <button
                  onClick={onSettingsClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
              </div>
              
              <div className="border-t border-slate-200 py-1">
                <button
                  onClick={() => {
                    logout();
                    onLogout?.();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;