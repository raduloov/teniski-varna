import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { MenuLinks } from './MenuLinks';
import { MenuLogo } from './MenuLogo';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';

export const MenuDesktop = () => {
  const navigate = useCustomNavigate();
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
  max-width: 350px;
`;
