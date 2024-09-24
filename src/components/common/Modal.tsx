import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { icons } from '../../assets/icons';
import { IconButton } from './IconButton';

export enum ModalEnterAnimation {
  SLIDE_DOWN = 'enter-slide-down',
  SLIDE_RIGHT = 'enter-slide-right',
  SLIDE_LEFT = 'enter-slide-left'
}

export enum ModalExitAnimation {
  SLIDE_RIGHT = 'exit-slide-right',
  SLIDE_LEFT = 'exit-slide-left'
}

const portalElement = document.getElementById('overlays') as HTMLElement;

interface Props {
  onClose: () => void;
  backButton?: boolean;
  enterAnimation?: ModalEnterAnimation;
  exitAnimation?: ModalExitAnimation;
  additionalStyles?: string;
  closing: boolean;
  children?: React.ReactNode;
}

type ContProps = Props & { closing: boolean };

export const Backdrop = ({ onClose, closing }: ContProps) => {
  return <BackDropCont onClick={onClose} closing={closing} />;
};

export const ModalOverlay = ({
  children,
  onClose,
  backButton,
  enterAnimation,
  exitAnimation,
  closing,
  additionalStyles
}: ContProps) => {
  return (
    <ModalOverlayCont
      closing={closing}
      enterAnimation={enterAnimation ?? ModalEnterAnimation.SLIDE_DOWN}
      exitAnimation={exitAnimation ?? ModalExitAnimation.SLIDE_RIGHT}
      additionalStyles={additionalStyles}
    >
      {backButton && (
        <BackButtonCont>
          <IconButton onClick={onClose} icon={icons.FaChevronLeft}></IconButton>
        </BackButtonCont>
      )}
      <div>{children}</div>
    </ModalOverlayCont>
  );
};

export const Modal = ({
  children,
  onClose,
  backButton,
  enterAnimation = ModalEnterAnimation.SLIDE_DOWN,
  exitAnimation = ModalExitAnimation.SLIDE_RIGHT,
  additionalStyles,
  closing
}: Props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} closing={closing} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={onClose}
          backButton={backButton}
          closing={closing}
          enterAnimation={enterAnimation}
          exitAnimation={exitAnimation}
          additionalStyles={additionalStyles}
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
  // hacky way to prevent background scrolling on iOS
  touch-action: none;
  animation: ${({ closing }) =>
    closing
      ? 'disappear 0.5s ease-out forwards'
      : 'appear 0.5s ease-out forwards'};

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ModalOverlayCont = styled.div<{
  additionalStyles?: string;
  closing: boolean;
  enterAnimation: ModalEnterAnimation;
  exitAnimation: ModalExitAnimation;
}>`
  position: fixed;
  z-index: 1000;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  // hacky way to prevent background scrolling on iOS
  touch-action: none;
  transition: all 0.5s ease-out;
  animation: ${({ closing, enterAnimation, exitAnimation }) =>
    closing
      ? `${exitAnimation} 0.5s ease-out forwards`
      : `${enterAnimation} 0.5s ease-out forwards`};

  ${({ additionalStyles }) =>
    css`
      ${additionalStyles}
    `}

  @keyframes enter-slide-down {
    0% {
      top: -100%;
    }
    100% {
      top: 0;
    }
  }

  @keyframes enter-slide-right {
    0% {
      left: -100%;
    }
    100% {
      left: 0%;
    }
  }

  @keyframes enter-slide-left {
    0% {
      right: -100%;
    }
    100% {
      right: 0%;
    }
  }

  @keyframes exit-slide-left {
    0% {
      left: 0%;
    }
    100% {
      left: -200%;
    }
  }

  @keyframes exit-slide-right {
    0% {
      right: 0%;
    }
    100% {
      right: -200%;
    }
  }
`;
