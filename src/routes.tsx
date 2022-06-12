import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CollectionPage, HomePage } from './pages';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
    </Routes>
  </BrowserRouter>
);
