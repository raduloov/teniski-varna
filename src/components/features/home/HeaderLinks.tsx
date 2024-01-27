import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import { keyframes } from 'styled-components';

interface Props {
  height: number;
}

type THeaderRef = React.ForwardedRef<HTMLDivElement>;

export const HeaderLinks = forwardRef(({ height }: Props, ref: THeaderRef) => {
  return (
    <HeaderLinksContainer ref={ref} height={height}>
      <StyledLink to="/">
        <icons.FaHome />
        Home
      </StyledLink>
      <StyledLink to="/favorites">
        <icons.MdFavorite />
        Favorites
      </StyledLink>
      <StyledLink to="/contact">
        <icons.MdPermContactCalendar />
        Contact
      </StyledLink>
      <StyledLink to="/about">
        <icons.RiInformationFill />
        About
      </StyledLink>
      <StyledLink to="/policies">
        <icons.MdPolicy />
        Policies
      </StyledLink>
      <StyledLink to="/faq">
        <icons.FaQuestionCircle />
        FAQ
      </StyledLink>
    </HeaderLinksContainer>
  );
});

HeaderLinks.displayName = 'HeaderLinks';

const linkAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  animation: ${linkAnimation} 0.5s ease forwards;
  opacity: 0;
`;

const HeaderLinksContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
  }
  a {
    display: flex;
    text-decoration: none;
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    gap: 0.5rem;
    align-items: center;
    color: ${Color.GRAY};
    background: ${({ height }) => (height ? Color.LIGHT_GRAY : 'transparent')};
    svg {
      margin-left: 0.25rem;
      cursor: pointer;
      width: 1rem;
      height: 1rem;
    }
  }
  a:active {
    background-color: ${Color.ACCENT};
  }
`;
