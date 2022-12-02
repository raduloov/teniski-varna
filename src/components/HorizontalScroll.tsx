import React from 'react';
import styled from 'styled-components';
import { Button, ButtonType } from './Button';

// Example categories to be passed
export const categories = ['Popular', 'Most Viewed', 'Recommended', 'New'];

interface Props {
  categories: Array<string>;
  selected: string;
  onSelectCategory: (category: string) => void;
}

export const HorizontalScroll = ({
  categories,
  selected,
  onSelectCategory
}: Props) => {
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
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
