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

interface Props {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}

export const Menu = ({ showMenu, setShowMenu }: Props) => {
  // enum Page {
  //   HOME = '/',
  //   FAVORITES = '/favorites',
  //   CONTACT = '/contact',
  //   ABOUT = '/about',
  //   FAQ = '/faq'
  // }
  const location = useLocation();
  const currentPage = location.pathname;
  console.log(currentPage === '/favorites');

  return (
    <>
      {showMenu && (
        <Modal
          onClose={() => setShowMenu(false)}
          enterAnimation={ModalEnterAnimation.SLIDE_RIGHT}
          exitAnimation={ModalExitAnimation.SLIDE_LEFT}
          backButton
          additionalStyles={`
            width: 65%;
            height: 100%;
          `}
        >
          <MenuContainer>
            <StyledLogo />
            <NavigationContainer>
              <StyledLink
                to={'/'}
                onClick={() => setShowMenu(false)}
                currentPage={currentPage === '/'}
              >
                <icons.FaHome
                  color={currentPage === '/' ? Color.WHITE : Color.DARK_GRAY}
                  size={25}
                />
                Начало
              </StyledLink>
              <StyledLink
                to={'/favorites'}
                currentPage={currentPage === '/favorites'}
              >
                <icons.FaHeart
                  color={
                    currentPage === '/favorites' ? Color.WHITE : Color.DARK_GRAY
                  }
                />
                Любими
              </StyledLink>
              <StyledLink
                to={'/contact'}
                currentPage={currentPage === '/contact'}
              >
                <icons.FaPhone
                  color={
                    currentPage === '/contact' ? Color.WHITE : Color.DARK_GRAY
                  }
                />
                Контакти
              </StyledLink>
              <StyledLink to={'/about'} currentPage={currentPage === '/about'}>
                <icons.RiInformationFill
                  color={
                    currentPage === '/about' ? Color.WHITE : Color.DARK_GRAY
                  }
                />
                За нас
              </StyledLink>
              <StyledLink to={'/faq'} currentPage={currentPage === '/faq'}>
                <icons.FaQuestionCircle
                  color={currentPage === '/faq' ? Color.WHITE : Color.DARK_GRAY}
                />
                FAQ
              </StyledLink>
            </NavigationContainer>
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
