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
