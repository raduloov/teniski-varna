import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/routes';
import { Header } from './components/features/home/Header';
import { useLocation } from 'react-router';
import { excludeHeader } from './utils/excludeHeader';
import styled from 'styled-components';

export const App = () => {
  const [topNavigationShow, setTopNavigationShow] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <StyledToast position={'top-center'} stacked />
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

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 30px;
  }
`;
