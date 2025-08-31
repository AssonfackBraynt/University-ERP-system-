// src/components/layout/DashboardLayout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  breadcrumbs?: BreadcrumbItem[];
  onSearch?: (query: string) => void;
  onNavigate?: (href: string, id?: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  notificationCount?: number;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection,
  breadcrumbs,
  onSearch,
  onNavigate,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  notificationCount = 0,
  className
}) => {
  const { user, updateLastActivity } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Close mobile sidebar when clicking outside
  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  // Update user activity on any interaction
  const handleUserActivity = () => {
    updateLastActivity();
  };

  // If no user is authenticated, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSidebarToggle = () => {
    // On mobile, toggle mobile sidebar; on desktop, toggle collapse
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleSidebarNavigate = (href: string, id: string) => {
    // Use React Router navigation if onNavigate is not provided
    if (onNavigate) {
      onNavigate(href, id);
    } else {
      navigate(href);
    }
  };

  const handleBreadcrumbNavigate = (href: string) => {
    // Use React Router navigation if onNavigate is not provided
    if (onNavigate) {
      onNavigate(href);
    } else {
      navigate(href);
    }
  };

  return (
    <div 
      className={cn('min-h-screen bg-slate-50 flex flex-col', className)}
      onClick={handleUserActivity}
      onKeyDown={handleUserActivity}
    >
      {/* Top Bar */}
      <div className={cn(
        "transition-all duration-300",
        // Add left margin for fixed sidebar on desktop
        isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <TopBar
          onSearch={onSearch}
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
          onSettingsClick={onSettingsClick}
          onLogout={onLogout}
          onMenuClick={handleSidebarToggle}
          notificationCount={notificationCount}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleMobileSidebarClose}
          />
        )}
        
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onToggleCollapse={handleSidebarToggle}
          onNavigate={handleSidebarNavigate}
          onMobileClose={handleMobileSidebarClose}
        />

        {/* Main Content Area */}
        <main className={cn(
          "flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300",
          // Add left margin for fixed sidebar on desktop
          isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
        )}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="bg-white border-b border-slate-200 px-6 py-3">
              <Breadcrumbs
                items={breadcrumbs}
                onNavigate={handleBreadcrumbNavigate}
              />
            </div>
          )}

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;