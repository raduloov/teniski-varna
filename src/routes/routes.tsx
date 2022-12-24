import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DetailsPage } from '../pages/DetailsPage';
import { AdminPanelPage } from '../pages/AdminPanelPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:productId" element={<DetailsPage />} />
      <Route path="/admin-panel" element={<AdminPanelPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      {/* <Route path="/about" element={<AboutPage />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} /> */}
    </Routes>
  );
};
