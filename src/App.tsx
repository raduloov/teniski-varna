import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/routes';
import { Header } from './components/features/home/Header';
import { useLocation } from 'react-router';
import { excludeHeader } from './utils/excludeHeader';

export const App = () => {
  const [topNavigationShow, setTopNavigationShow] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
      {excludeHeader(currentPath) && (
        <Header
          setTopNavigationShow={setTopNavigationShow}
          topNavigationShow={topNavigationShow}
        />
      )}
      <AppRoutes />
    </>
  );
};
