import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { PrivateRoute, RedirectRoute } from './components';
import { history } from './config';

import {
  ProfilePage,
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from './pages';

export const AppRoutes = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={(
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        )}
      />
      <Route
        path="/login"
        element={(
          <RedirectRoute>
            <LoginPage />
          </RedirectRoute>
        )}
      />
      <Route
        path="/register"
        element={(
          <RedirectRoute>
            <RegisterPage />
          </RedirectRoute>
        )}
      />
      <Route
        path="/forgot-password"
        element={(
          <RedirectRoute>
            <ForgotPasswordPage />
          </RedirectRoute>
        )}
      />
    </Routes>
  </HistoryRouter>
);
