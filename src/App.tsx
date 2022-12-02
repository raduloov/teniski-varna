import React from 'react';
import { Button } from './components/Button';
import { AppRoutes } from './routes/routes';

export const App = () => {
  return (
    <>
      <Button label="CLICK ME" />
      <AppRoutes />
    </>
  );
};
