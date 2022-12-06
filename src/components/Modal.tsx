import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { icons } from '../assets/icons';
import { IconButton } from './IconButton';

const portalElement = document.getElementById('overlays') as HTMLElement;
export interface Props {
  onClose: () => void;
  children?: React.ReactNode;
}
export const Backdrop = ({ onClose }: Props) => {
  return <BackDropCont onClick={onClose} />;
};

export const ModalOverlay = ({ children, onClose }: Props) => {
  return (
    <ModalOverlayCont>
      <BackButtonCont>
        <IconButton onClick={onClose} icon={icons.FaChevronLeft}></IconButton>
      </BackButtonCont>
      <div>{children}</div>
    </ModalOverlayCont>
  );
};

export const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};
const BackButtonCont = styled.div`
  margin-left: 2rem;
  margin-top: 2rem;
`;
const BackDropCont = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9;
`;
const ModalOverlayCont = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.5s ease-out;
  animation: slide-in 0.5s ease-out forwards;

  //add media query for mobile
  @keyframes slide-in {
    0% {
      opacity: 0;
      top: 20%;
    }
    100% {
      opacity: 1;
      top: 40%;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    top: 0;
    left: 50%;
    @keyframes slide-in {
      0% {
        opacity: 0;
        top: -100%;
      }
      100% {
        opacity: 1;
        top: 0;
      }
    }
  }
`;
