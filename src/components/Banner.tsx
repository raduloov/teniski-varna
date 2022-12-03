import React from 'react';
import styled from 'styled-components';

export const Banner = () => {
  return (
    <BannerContainer>
      <img src="https://static.wikia.nocookie.net/36404868-b546-4edd-87ca-e387f1a2acc7" />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  background-color: transparent;
  display: flex;
  padding: 1.5rem;
  img {
    margin: auto;
    width: 100%;
    height: 100%;
    border-radius: 45px/50px;
  }
`;
