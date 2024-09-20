import { css } from 'styled-components';

export const pressAnimation = css`
  :hover {
    transform: scale(1.3);
    filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  }
  :active {
    transform: scale(0.9);
  }
  transition: ease-out 0.3s;
`;

export const productAppearAnimation = css`
  animation: productAppear ease-in 0.5s;
  @keyframes productAppear {
    from {
      opacity: 0;
      transform: translateY(-10%) scale(1.2);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export const modalAppearAnimation = css`
  animation: modalAppear 0.5s ease-out forwards;
  @keyframes modalAppear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const modalDisappearAnimation = css`
  animation: modalDisappear 0.5s ease-out forwards;
  @keyframes modalDisappear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const cartButtonSlideOutAnimation = css`
  animation: slideout 0.5s ease-out forwards;
  @keyframes slideout {
    from {
      transform: translateY(-90%) scale(1.2);
    }
    to {
      transform: translateY(0) scale(1);
    }
  }
`;

export const cartButtonSlideInAnimation = css`
  animation: slidein 0.3s ease-in forwards;
  @keyframes slidein {
    from {
      transform: translateY(90%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const scrollButtonAppearAnimation = css`
  animation: scrollAppear ease-in 0.2s;
  @keyframes scrollAppear {
    from {
      opacity: 0;
      transform: translateY(-10%) scale(1.2);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
