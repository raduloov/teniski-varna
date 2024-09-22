import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';

export const MenuLogo = styled(Logo)`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  height: 100px;

  @media (min-width: 768px) {
    top: 2rem;
  }
`;
