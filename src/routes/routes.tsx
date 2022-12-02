import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DetailsPage } from '../pages/DetailsPage';
import { HomePage } from '../pages/HomePage';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsPage />} />
        {/* <Route path="/admin-panel" element={<AdminPanelPage />} /> */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  );
};
