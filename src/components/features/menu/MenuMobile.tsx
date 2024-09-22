import React from 'react';
import {
  Modal,
  ModalEnterAnimation,
  ModalExitAnimation
} from '../../common/Modal';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useModalClose } from '../../../hooks/useModalClose';
import { MenuLinks } from './MenuLinks';
import { MenuLogo } from './MenuLogo';

interface Props {
  showMenu: boolean;
  onCloseMenu: () => void;
}

export const MenuMobile = ({ showMenu, onCloseMenu }: Props) => {
  const { closing, handleClose } = useModalClose(onCloseMenu);
  const navigate = useNavigate();
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
            <MenuLogo onClick={() => navigate('/')} />
            <MenuLinks currentPage={currentPage} onClick={handleClose} />
          </MenuContainer>
        </Modal>
      )}
    </>
  );
};

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
