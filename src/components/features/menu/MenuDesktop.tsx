import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuLinks } from './MenuLinks';
import { MenuLogo } from './MenuLogo';

export const MenuDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <MenuContainer>
      <MenuLogo onClick={() => navigate('/')} />
      <MenuLinks currentPage={currentPage} />
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
