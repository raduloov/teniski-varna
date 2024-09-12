import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { icons } from '../../assets/icons';
import { IconButton } from './IconButton';

const portalElement = document.getElementById('overlays') as HTMLElement;

interface Props {
  onClose: () => void;
  fullscreen?: boolean;
  backButton?: boolean;
  children?: React.ReactNode;
}

type ContProps = Props & { closing: boolean };

export const Backdrop = ({ onClose, closing }: ContProps) => {
  return <BackDropCont onClick={onClose} closing={closing} />;
};

export const ModalOverlay = ({
  children,
  onClose,
  fullscreen,
  backButton,
  closing
}: ContProps) => {
  return (
    <ModalOverlayCont fullscreen={fullscreen} closing={closing}>
      {backButton && (
        <BackButtonCont>
          <IconButton onClick={onClose} icon={icons.FaChevronLeft}></IconButton>
        </BackButtonCont>
      )}
      <div>{children}</div>
    </ModalOverlayCont>
  );
};

export const Modal = ({ children, onClose, fullscreen, backButton }: Props) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={handleClose} closing={closing} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={handleClose}
          fullscreen={fullscreen}
          backButton={backButton}
          closing={closing}
        >
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

const BackButtonCont = styled.div`
  margin-left: 2rem;
  margin-top: 2rem;
`;

const BackDropCont = styled.div<{ closing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 900;
  animation: ${({ closing }) =>
    closing
      ? 'dissapear 0.5s ease-out forwards'
      : 'appear 0.5s ease-out forwards'};

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes dissapear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ModalOverlayCont = styled.div<{ fullscreen?: boolean; closing: boolean }>`
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.5s ease-out;
  animation: ${({ closing }) =>
    closing
      ? 'slide-out 0.5s ease-out forwards'
      : 'slide-in 0.5s ease-out forwards'};
  transform: ${({ fullscreen }) =>
    fullscreen ? `translateX(-50%)` : `translate(-50%, 100%)`};

  @keyframes slide-in {
    0% {
      top: -100%;
    }
    100% {
      top: 0;
    }
  }

  @keyframes slide-out {
    0% {
      top: 0;
    }
    100% {
      top: 0;
      left: 200%;
    }
  }

  // Media query for mobile devices
  @media (max-width: 768px) {
    width: ${({ fullscreen }) => (fullscreen ? '100%' : '95%')};
    ${({ fullscreen }) => fullscreen && 'height: 100%;'}
    top: 0;
    left: 50%;
  }
`;
