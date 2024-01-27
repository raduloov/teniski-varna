import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import { keyframes } from 'styled-components';

interface Props {
  height: number;
  setHeaderContainerHeight: React.Dispatch<React.SetStateAction<number>>;
}

export const HeaderLinks = ({ height, setHeaderContainerHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const currentPage = location.pathname;
  useEffect(() => {
    if (!headerRef.current) return;
    setHeaderContainerHeight(headerRef.current?.clientHeight);
    return () => setHeaderContainerHeight(0);
  });

  return (
    <HeaderLinksContainer ref={headerRef} height={height}>
      <StyledLink to="/" currentPage={currentPage === '/'}>
        <icons.FaHome />
        Home
      </StyledLink>
      <StyledLink to="/favorites" currentPage={currentPage === '/favorites'}>
        <icons.MdFavorite />
        Favorites
      </StyledLink>
      <StyledLink to="/contact" currentPage={currentPage === '/contact'}>
        <icons.MdPermContactCalendar />
        Contact
      </StyledLink>
      <StyledLink to="/about" currentPage={currentPage === '/about'}>
        <icons.RiInformationFill />
        About
      </StyledLink>
      <StyledLink to="/policies" currentPage={currentPage === '/policies'}>
        <icons.MdPolicy />
        Policies
      </StyledLink>
      <StyledLink to="/faq" currentPage={currentPage === '/faq'}>
        <icons.FaQuestionCircle />
        FAQ
      </StyledLink>
    </HeaderLinksContainer>
  );
};

HeaderLinks.displayName = 'HeaderLinks';

const linkAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)<{ currentPage: boolean }>`
  animation: ${linkAnimation} 0.5s ease forwards;
  opacity: 0;
  :active {
    background-color: ${Color.ACCENT};
  }
  display: flex;
  text-decoration: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  gap: 0.5rem;
  align-items: center;
  background: ${({ currentPage }) =>
    currentPage ? Color.ACCENT : Color.LIGHT_GRAY};
  color: ${Color.GRAY};
  svg {
    margin-left: 0.25rem;
    cursor: pointer;
    width: 1rem;
    height: 1rem;
  }
`;

const HeaderLinksContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
