import React from 'react';
import { Header } from './components/Header';
import { AppRoutes } from './routes/routes';

export const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};
