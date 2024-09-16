import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/routes';
import { Header } from './components/features/home/Header';
import { Footer } from './components/features/home/Footer';
import { useLocation } from 'react-router';
import { excludeHeader } from './utils/excludeHeader';
import styled from 'styled-components';
import { excludeFooter } from './utils/excludeFooter';

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppContainer>
      <div>
        <StyledToast position={'top-center'} stacked />
        {excludeHeader(currentPath) && <Header />}
        <AppRoutes />
      </div>
      {excludeFooter(currentPath) && <Footer />}
    </AppContainer>
  );
};

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 30px;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100svh;
`;
