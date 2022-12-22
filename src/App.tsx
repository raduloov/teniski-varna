import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/routes';

export const App = () => {
  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
      <AppRoutes />
    </>
  );
};
