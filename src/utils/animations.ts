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
  animation: slideout-mobile 0.5s ease-out forwards;
  @keyframes slideout-mobile {
    from {
      transform: translateY(-90%) scale(1.2);
    }
    to {
      transform: translateY(0) scale(1);
    }
  }

  @media (min-width: 1024px) {
    animation: slideout-desktop 0.5s ease-out forwards;
    @keyframes slideout-desktop {
      from {
        transform: translateY(-90%) scale(1.2);
      }
      to {
        transform: translateY(0) scale(1);
        transform: translateX(160%);
      }
    }
  }
`;

export const cartButtonSlideInAnimation = css`
  animation: slidein-mobile 0.3s ease-in forwards;
  @keyframes slidein-mobile {
    from {
      transform: translateY(90%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (min-width: 1024px) {
    animation: slidein-desktop 0.3s ease-in forwards;
    @keyframes slidein-desktop {
      from {
        transform: translate(160%, 90%);
      }
      to {
        transform: translate(0, 0);
      }
    }
  }
`;

export const scrollButtonAppearAnimation = css`
  animation: scrollAppear-mobile ease-in 0.2s;
  @keyframes scrollAppear-mobile {
    from {
      opacity: 0;
      transform: scale(1.2);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (min-width: 1024px) {
    animation: scrollAppear-desktop ease-in 0.2s;
    @keyframes scrollAppear-desktop {
      from {
        opacity: 0;
        transform: translate(160%) scale(1.2);
      }
      to {
        opacity: 1;
        transform: translate(160%) scale(1);
      }
    }
  }
`;
