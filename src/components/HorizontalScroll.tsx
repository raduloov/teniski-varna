import React from 'react';
import styled from 'styled-components';
import { Button, ButtonType } from './Button';

// Example categories to be passed
export const categories = ['Popular', 'Most Viewed', 'Recommended', 'New'];

interface Props {
  categories: Array<string>;
  selected: string;
}

export const HorizontalScroll = ({ categories, selected }: Props) => {
  const onSelectCategory = (category: string) => {
    // set category state from parent
  };

  const getButtonType = (category: string): ButtonType =>
    category === selected ? ButtonType.PRIMARY : ButtonType.UNSELECTED;

  return (
    <Wrapper>
      {categories.map((category, index) => {
        return (
          <ButtonContainer key={`category-${index}`}>
            <Button
              label={category}
              type={getButtonType(category)}
              onClick={() => onSelectCategory(category)}
            />
          </ButtonContainer>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: none;
  overflow-x: scroll;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
