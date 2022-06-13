import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useTypedSelector } from '../hooks';
import { getCurrentUser } from '../selectors';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const RedirectRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const location = useLocation();

  const currentUser = useTypedSelector(getCurrentUser);

  return !currentUser ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
