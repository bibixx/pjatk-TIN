import React from 'react';
import { UserType } from '@s19192/shared';
import { useAuth } from 'hooks/useAuth/useAuth';
import { Navigate } from 'react-router-dom';

export function withProtection<T>(userGroups: UserType[] = []) {
  return (Component: React.ComponentType<T>) => {
    return (props: T) => {
      const { user } = useAuth();

      if (user === null) {
        return <Navigate to="/login" replace />;
      }

      const isUserInGroup = userGroups.some((group) => user.userType === group);

      if (!isUserInGroup && userGroups.length > 0) {
        return <Navigate to="/" replace />;
      }

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} />;
    };
  };
}
