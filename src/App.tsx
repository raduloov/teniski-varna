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
import { MenuDesktop } from './components/features/menu/MenuDesktop';
import { ScreenSize, useScreenSize } from './hooks/useScreenSize';

export const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const screenSize = useScreenSize();

  const isLargeScreen = screenSize === ScreenSize.LARGE;
  const showMenuDesktop = isLargeScreen;

  const excludeFooterArray = ['/admin-panel'];
  if (isLargeScreen) {
    excludeFooterArray.push('/products');
  }

  return (
    <>
      <StyledToast
        position={'top-center'}
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        stacked
      />
      <AppContainer>
        <DesktopLayout>
          {showMenuDesktop && (
            <div>
              <MenuDesktop />
            </div>
          )}
          <Content>
            {excludeHeader(currentPath) && <Header />}
            <AppRoutes />
          </Content>
        </DesktopLayout>
        {excludeFooter(currentPath) && <Footer />}
      </AppContainer>
    </>
  );
};

const StyledToast = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 30px;
  }
`;

const DesktopLayout = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    width: 100%;
  }
`;

const Content = styled.div`
  @media (min-width: 768px) {
    width: 800px;
  }

  @media (min-width: 1366px) {
    width: 1000px;
  }

  @media (min-width: 1600px) {
    width: 1200px;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100svh;

  @media (min-width: 768px) {
    align-items: center;
  }
`;
