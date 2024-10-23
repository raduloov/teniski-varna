import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';

enum StarType {
  FILLED = 'FILLED',
  OUTLINED = 'OUTLINED',
  HALF = 'HALF'
}

interface StarProps {
  type: StarType;
}

interface Props {
  minWidth?: number;
}

// TODO Yavor: Implement rating functionality

const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/place/%D0%A2%D0%B5%D0%BD%D0%B8%D1%81%D0%BA%D0%B8+%D0%92%D0%B0%D1%80%D0%BD%D0%B0/@43.2279343,27.8723692,17z/data=!3m1!5s0x40a45497779a476b:0x204815f354260788!4m8!3m7!1s0x40a4556a9f13df2b:0x62fdf3b131c47559!8m2!3d43.2279343!4d27.8749441!9m1!1b1!16s%2Fg%2F11sckbt90_?entry=ttu&g_ep=EgoyMDI0MDkwOC4wIKXMDSoASAFQAw%3D%3D';

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

export const RatingStars = ({ minWidth }: Props) => {
  const redirectToGoogleMapsReviews = () =>
    window.open(GOOGLE_MAPS_REVIEWS_URL, '_blank');

  return (
    <Wrapper minWidth={minWidth} onClick={() => redirectToGoogleMapsReviews()}>
      <StarsWrapper>
        <Star type={StarType.FILLED} />
        <Star type={StarType.FILLED} />
        <Star type={StarType.FILLED} />
        <Star type={StarType.FILLED} />
        <Star type={StarType.FILLED} />
      </StarsWrapper>
      <Reviews>(220+ отзива)</Reviews>
    </Wrapper>
  );
};

const Reviews = styled.p`
  line-height: 0;
  color: ${Color.GRAY};
`;

const StarsWrapper = styled.div`
  flex-direction: row;
`;

const Wrapper = styled.div<{ minWidth?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: ${({ minWidth }) => minWidth || 0}px;
  cursor: pointer;
`;
