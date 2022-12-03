import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Color } from '../assets/constants';
import { pressAnimation } from '../utils/animations';

interface Props {
  icon: IconType;
  onClick?: () => void;
}

export const IconButton = ({ icon, onClick }: Props) => {
  return <Container onClick={onClick}>{React.createElement(icon)}</Container>;
};

const Container = styled.div`
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${Color.WHITE};
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  svg {
    cursor: pointer;
    color: ${Color.GRAY};
  }
  ${pressAnimation}
`;
