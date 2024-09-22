import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { Link } from 'react-router-dom';
import { icons } from '../../../assets/icons';

const pages = [
  {
    name: 'Начало',
    icon: icons.FaHome,
    path: '/'
  },
  {
    name: 'Любими',
    icon: icons.FaHeart,
    path: '/favorites'
  },
  {
    name: 'Контакти',
    icon: icons.FaPhone,
    path: '/contact'
  },
  {
    name: 'За нас',
    icon: icons.FaInfoCircle,
    path: '/about'
  },
  {
    name: 'FAQ',
    icon: icons.FaQuestionCircle,
    path: '/faq'
  }
];

interface MenuLinkProps {
  currentPage: string;
  onClick?: () => void;
}

export const MenuLinks = ({ currentPage, onClick }: MenuLinkProps) => {
  return (
    <NavigationContainer>
      {pages.map((page) => (
        <StyledLink
          currentPage={currentPage === page.path}
          to={page.path}
          onClick={onClick}
          key={page.path}
        >
          <page.icon
            color={currentPage === page.path ? Color.WHITE : Color.DARK_GRAY}
            size={25}
            style={{ transition: 'none' }}
          />
          {page.name}
        </StyledLink>
      ))}
    </NavigationContainer>
  );
};

const StyledLink = styled(Link)<{ currentPage: boolean }>`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: ${Color.DARK_GRAY};
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    background-color: ${Color.LIGHT_GRAY};
  }

  ${({ currentPage }) =>
    currentPage &&
    `
      background-color: ${Color.GRAY};
      color: ${Color.WHITE};
      cursor: default;
      &:hover {
        background-color: ${Color.GRAY};
      }
    `}
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 5rem 1rem 0 1rem;

  @media (min-width: 1024px) {
    padding: 10rem 2rem 0 2rem;
  }
`;
