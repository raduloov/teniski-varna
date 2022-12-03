import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { pressAnimation } from '../utils/animations';

interface Props {
  productTitle?: string;
  productDescription?: string;
  productPrice?: string;
  productImage?: string;
}

export const ProductCard = ({
  productTitle = 'Product Title',
  productDescription = 'Product Description',
  productPrice = '88.00',
  productImage = 'https://picsum.photos/150/200'
}: Props) => {
  const addToFavorites = () => {
    // TODO: Add to favorites functionality
  };

  return (
    <Card>
      <img src={productImage} />
      <h1>{productTitle}</h1>
      <p>{productDescription}</p>
      <h1>{productPrice}</h1>
      <HeartButton onClick={addToFavorites}>
        <icons.FaRegHeart color={Color.MEDIUM_GRAY} size={25} />
      </HeartButton>
    </Card>
  );
};

const Card = styled.div`
  cursor: pointer;
  width: 45%;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${Color.WHITE};
  gap: 0.3rem;
  border-radius: 10px;
  padding: 1rem;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
  :hover {
    transform: scale(1.05);
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.3));
  }
  transition: ease-out 0.2s;
  img {
    background-size: cover;
    object-fit: cover;
    border-radius: 10px;
  }
  h1 {
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
  }
  p {
    color: ${Color.GRAY};
    font-size: 0.9rem;
  }
`;

const HeartButton = styled.div`
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${Color.LIGHT_GRAY};
  ${pressAnimation}
`;
