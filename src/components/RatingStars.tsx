import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';

enum StarType {
  FILLED = 'FILLED',
  OUTLINED = 'OUTLINED',
  HALF = 'HALF'
}

interface StarProps {
  type: StarType;
}

// TODO Yavor: Implement rating functionality

const Star = ({ type }: StarProps) => {
  switch (type) {
    case StarType.FILLED:
      return <icons.BsStarFill color={Color.ACCENT} />;
    case StarType.OUTLINED:
      return <icons.BsStar color={Color.ACCENT} />;
    case StarType.HALF:
      return <icons.BsStarHalf color={Color.ACCENT} />;
  }
};

export const RatingStars = () => {
  return (
    <Wrapper>
      <StarsWrapper>
        <Star type={StarType.FILLED} />
        <Star type={StarType.FILLED} />
        <Star type={StarType.HALF} />
        <Star type={StarType.OUTLINED} />
        <Star type={StarType.OUTLINED} />
      </StarsWrapper>
      <Reviews>(2400+ reviews)</Reviews>
    </Wrapper>
  );
};

const Reviews = styled.p`
  color: ${Color.GRAY};
`;

const StarsWrapper = styled.div`
  flex-direction: row;
  align-self: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
