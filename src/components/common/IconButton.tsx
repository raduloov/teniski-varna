import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import { Color } from '../../assets/constants';
import { pressAnimation } from '../../utils/animations';

interface Props {
  icon: IconType;
  containerColor?: Color;
  iconColor?: Color;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  containerColor = Color.WHITE,
  iconColor,
  onClick
}: Props) => {
  const iconElement = React.createElement(icon, {
    style: { color: iconColor }
  });

  return (
    <Container backgroundColor={containerColor} onClick={onClick}>
      {iconElement}
    </Container>
  );
};

const Container = styled.div<{ backgroundColor?: Color }>`
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
  background-color: ${(props) => props.backgroundColor ?? Color.WHITE};
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  svg {
    cursor: pointer;
    color: ${Color.GRAY};
  }
  ${pressAnimation}
`;
