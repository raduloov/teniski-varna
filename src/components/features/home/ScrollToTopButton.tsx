import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';

interface Props {
  onScrollToTop: () => void;
  showButton: boolean;
}

export const ScrollToTopButton = ({ onScrollToTop, showButton }: Props) => {
  return (
    <FixedButtonWrapper isVisible={showButton}>
      <Button onClick={onScrollToTop}>
        <icons.FaArrowUp color={Color.GRAY} />
      </Button>
    </FixedButtonWrapper>
  );
};

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
`;

const FixedButtonWrapper = styled.div<{ isVisible: boolean }>`
  position: fixed;
  z-index: 800;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  bottom: 3.5rem;
  right: 1.5rem;
  ${({ isVisible }) =>
    isVisible
      ? `
        animation: appear 0.5s ease-out forwards;
      `
      : `
        bottom: 1.5rem;
        animation: dissapear 0.3s ease-in forwards;
    `}

  @keyframes appear {
    from {
      transform: translateY(-10%) scale(1.2);
    }
    to {
      transform: translateY(0) scale(1);
    }
  }

  @keyframes dissapear {
    from {
      opacity: 1;
    }
    to {
      transform: scale(0.2);
      opacity: 0;
    }
  }
`;
