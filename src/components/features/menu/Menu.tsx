import React from 'react';
import {
  Modal,
  ModalEnterAnimation,
  ModalExitAnimation
} from '../../common/Modal';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import styled from 'styled-components';
import { icons } from '../../../assets/icons';
import { Color } from '../../../assets/constants';
import { Link, useLocation } from 'react-router-dom';
import { useModalClose } from '../../../hooks/useModalClose';

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
    icon: icons.RiInformationFill,
    path: '/about'
  },
  {
    name: 'FAQ',
    icon: icons.FaQuestionCircle,
    path: '/faq'
  }
];

interface Props {
  showMenu: boolean;
  onCloseMenu: () => void;
}

interface MenuLinkProps {
  currentPage: string;
  onClick: () => void;
}

const MenuLinks = ({ currentPage, onClick }: MenuLinkProps) => {
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
          />
          {page.name}
        </StyledLink>
      ))}
    </NavigationContainer>
  );
};

export const Menu = ({ showMenu, onCloseMenu }: Props) => {
  const { closing, handleClose } = useModalClose(onCloseMenu);
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <>
      {showMenu && (
        <Modal
          onClose={handleClose}
          enterAnimation={ModalEnterAnimation.SLIDE_RIGHT}
          exitAnimation={ModalExitAnimation.SLIDE_LEFT}
          backButton
          closing={closing}
          additionalStyles={`
            width: 65%;
            height: 100%;
          `}
        >
          <MenuContainer>
            <StyledLogo />
            <MenuLinks currentPage={currentPage} onClick={handleClose} />
          </MenuContainer>
        </Modal>
      )}
    </>
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
    `}

  &icons {
    color: ${Color.DARK_GRAY};
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 5rem 1rem 0 1rem;
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
