import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DetailsPage } from '../pages/DetailsPage';
import { AdminPanelPage } from '../pages/AdminPanelPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { FAQPage } from '../pages/FAQPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { PoliciesPage } from '../pages/PoliciesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:productId" element={<DetailsPage />} />
      <Route path="/admin-panel" element={<AdminPanelPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/policies" element={<PoliciesPage />} />
    </Routes>
  );
};
