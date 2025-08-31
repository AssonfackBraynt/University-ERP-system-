import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = '/login'
}) => {
  const { isAuthenticated, user, hasRole, hasPermission, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Access Denied</h2>
              <p className="text-slate-600 mb-4">
                You don't have permission to access this page.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-sm text-slate-500">Your role:</span>
                <Badge variant={user?.role === 'admin' ? 'success' : user?.role === 'instructor' ? 'info' : 'default'}>
                  {user?.role?.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-slate-500">Required role:</span>
                <Badge variant={requiredRole === 'admin' ? 'success' : requiredRole === 'instructor' ? 'info' : 'default'}>
                  {requiredRole?.toUpperCase()}
                </Badge>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go Back
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Insufficient Permissions</h2>
              <p className="text-slate-600 mb-4">
                You don't have the required permission to access this feature.
              </p>
              <div className="bg-slate-100 rounded-lg p-3 mb-4">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Required permission:</span> {requiredPermission}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.history.back()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go Back
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User has access, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;