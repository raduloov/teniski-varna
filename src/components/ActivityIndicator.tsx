import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { Color } from '../assets/constants';

interface Props {
  color: Color;
  size: number;
}

export const ActivityIndicator = ({ color, size }: Props) => {
  return (
    <Wrapper>
      <ThreeDots color={color} height={size} width={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
