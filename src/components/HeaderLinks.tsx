import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';

export const HeaderLinks = () => {
  return (
    <HeaderLinksContainer>
      <Link to="/">
        <icons.FaHome />
        Home
      </Link>
      <Link to="/">
        <icons.MdFavorite />
        Favorites
      </Link>
      <Link to="/">
        <icons.MdPermContactCalendar />
        Contact
      </Link>
      <Link to="/">
        <icons.RiInformationFill />
        About
      </Link>
      <Link to="/">
        <icons.MdPolicy />
        Policies
      </Link>
      <Link to="/">
        <icons.FaQuestionCircle />
        FAQ
      </Link>
    </HeaderLinksContainer>
  );
};
const HeaderLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.5s ease-out;
  animation: slide-in 0.5s ease-out forwards;
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(-15%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  svg {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
  }
  a {
    display: flex;
    text-decoration: none;
    color: ${Color.GRAY};
    background-color: ${Color.LIGHT_GRAY};
    width: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    gap: 0.5rem;
    align-items: center;

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
