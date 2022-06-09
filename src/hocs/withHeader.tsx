/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Header } from '../components';

export const withHeader = (Component: React.ComponentType) => (props: any) => (
  <>
    <Header />
    <Component {...props} />
  </>
);
