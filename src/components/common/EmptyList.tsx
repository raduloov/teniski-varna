import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';

export const EmptyProductList = () => (
  <EmptyContainer>
    <icons.FaHeartBroken size={100} color={Color.LIGHT_RED} />
    <Text>Не можахме да намерим нищо тук</Text>
  </EmptyContainer>
);

const Text = styled.p`
  font-size: 1.5rem;
  color: ${Color.GRAY};
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  height: 100%;
`;
