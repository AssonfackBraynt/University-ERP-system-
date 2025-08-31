import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  requiredPermissions?: string[]; // All permissions required
  anyPermission?: string[]; // Any one permission required
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredRole,
  requiredPermission,
  requiredPermissions = [],
  anyPermission = [],
  fallback = null,
  showFallback = false
}) => {
  const { user, hasRole, hasPermission } = useAuth();

  // If no user is authenticated, don't show content
  if (!user) {
    return showFallback ? <>{fallback}</> : null;
  }

  // Check role requirement
  if (requiredRole && !hasRole(requiredRole)) {
    return showFallback ? <>{fallback}</> : null;
  }

  // Check single permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return showFallback ? <>{fallback}</> : null;
  }

  // Check multiple permissions requirement (all must be satisfied)
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );
    if (!hasAllPermissions) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  // Check any permission requirement (at least one must be satisfied)
  if (anyPermission.length > 0) {
    const hasAnyPermission = anyPermission.some(permission => 
      hasPermission(permission)
    );
    if (!hasAnyPermission) {
      return showFallback ? <>{fallback}</> : null;
    }
  }

  // User has required permissions, show content
  return <>{children}</>;
};

// Higher-order component version
export const withPermission = (
  Component: React.ComponentType<any>,
  permissions: {
    requiredRole?: UserRole;
    requiredPermission?: string;
    requiredPermissions?: string[];
    anyPermission?: string[];
  }
) => {
  return (props: any) => (
    <PermissionGuard {...permissions}>
      <Component {...props} />
    </PermissionGuard>
  );
};

// Hook for conditional rendering based on permissions
export const usePermissionCheck = () => {
  const { hasRole, hasPermission } = useAuth();

  const checkPermissions = ({
    requiredRole,
    requiredPermission,
    requiredPermissions = [],
    anyPermission = []
  }: {
    requiredRole?: UserRole;
    requiredPermission?: string;
    requiredPermissions?: string[];
    anyPermission?: string[];
  }): boolean => {
    // Check role requirement
    if (requiredRole && !hasRole(requiredRole)) {
      return false;
    }

    // Check single permission requirement
    if (requiredPermission && !hasPermission(requiredPermission)) {
      return false;
    }

    // Check multiple permissions requirement (all must be satisfied)
    if (requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission => 
        hasPermission(permission)
      );
      if (!hasAllPermissions) {
        return false;
      }
    }

    // Check any permission requirement (at least one must be satisfied)
    if (anyPermission.length > 0) {
      const hasAnyPermission = anyPermission.some(permission => 
        hasPermission(permission)
      );
      if (!hasAnyPermission) {
        return false;
      }
    }

    return true;
  };

  return { checkPermissions };
};

export default PermissionGuard;