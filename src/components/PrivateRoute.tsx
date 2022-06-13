import React from 'react';
import { Center } from '@mantine/core';
import { Navigate, useLocation } from 'react-router-dom';
import { Pokeball } from 'tabler-icons-react';

import { useTypedSelector } from '../hooks';
import { getCurrentUser, getUserLoading } from '../selectors';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const location = useLocation();

  const currentUser = useTypedSelector(getCurrentUser);
  const isLoading = useTypedSelector(getUserLoading);

  if (isLoading) {
    return (
      <Center py="sm" sx={{ height: '100vh' }}>
        <Pokeball size={30} color="#A0A0A0" />
      </Center>
    );
  }

  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
