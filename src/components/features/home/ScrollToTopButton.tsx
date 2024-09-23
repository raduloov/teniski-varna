import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import { scrollButtonAppearAnimation } from '../../../utils/animations';

interface Props {
  onScrollToTop: () => void;
  showButton: boolean;
  isFooterVisible: boolean;
}

export const ScrollToTopButton = ({
  onScrollToTop,
  showButton,
  isFooterVisible
}: Props) => {
  return (
    <FixedButtonWrapper
      showButton={showButton}
      isFooterVisible={isFooterVisible}
    >
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

const FixedButtonWrapper = styled.div<{
  showButton: boolean;
  isFooterVisible: boolean;
}>`
  z-index: 800;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));

  ${({ showButton }) =>
    showButton &&
    `
        position: fixed;
        bottom: 2.5rem;
        transform: translateX(120%);
        ${scrollButtonAppearAnimation}

        @media (max-width: 1024px) {
          bottom: 2.5rem;
          right: 1.5rem;
          transform: translateX(0);
        }
      `}
  ${({ isFooterVisible }) =>
    isFooterVisible &&
    `
      position: absolute;
      bottom: 0.5rem;

      @media (max-width: 1024px) {
        bottom: 0.5rem;
      }
    `}
`;
