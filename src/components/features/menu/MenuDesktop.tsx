import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { MenuLinks } from './MenuLinks';
import { MenuLogo } from './MenuLogo';

export const MenuDesktop = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <MenuContainer>
      <MenuLogo />
      <MenuLinks currentPage={currentPage} />
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
