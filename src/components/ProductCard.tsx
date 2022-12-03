import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';

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
      <h1>
        ${productPrice}
        <HeartContainer onClick={addToFavorites}>
          <icons.FaRegHeart />
        </HeartContainer>
      </h1>
    </Card>
  );
};

const Card = styled.div`
  cursor: pointer;
  width: 45%;
  display: flex;
  flex-direction: column;
  background-color: ${Color.WHITE};
  gap: 0.3rem;
  border-radius: 10px;
  padding: 1rem;
  filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15));
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
const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${Color.LIGHT_GRAY};
`;
