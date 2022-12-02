import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

// Example categories to be passed
// export const categories = ['Popular', 'Most Viewed', 'Recommended', 'New'];

interface Props {
  categories: Array<string>;
}

export const HorizontalScroll = ({ categories }: Props) => {
  const onSelectCategory = (category: string) => {
    // set category state from parent
  };

  return (
    <Container>
      {categories.map((category, index) => {
        return (
          <ButtonContainer key={`category-${index}`}>
            <Button
              label={category}
              onClick={() => onSelectCategory(category)}
            />
          </ButtonContainer>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: none;
  overflow-x: scroll;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
