import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/routes';
import { Header } from './components/features/home/Header';

export const App = () => {
  const [topNavigationShow, setTopNavigationShow] = useState<boolean>(false);
  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
      <Header
        setTopNavigationShow={setTopNavigationShow}
        topNavigationShow={topNavigationShow}
      />
      <AppRoutes />
    </>
  );
};
