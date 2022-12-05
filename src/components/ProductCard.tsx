import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { Product } from '../hooks/useProducts';
import { IconButton } from './IconButton';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { productId }
    });
  };

  const addToFavorites = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log('Add to favorites');
    // TODO: Add to favorites functionality
  };

  return (
    <Card onClick={() => navigateToDetails(id)}>
      <img src={image} />
      <h1>{title}</h1>
      <p>{description}</p>
      <BottomCardContainer>
        <h1>${price}</h1>
        <IconButton icon={icons.FaRegHeart} onClick={addToFavorites} />
      </BottomCardContainer>
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
  padding: 0.5rem;
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

const BottomCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    margin-top: auto;
  }
`;
