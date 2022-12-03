import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { pressAnimation } from '../utils/animations';

interface Props {
  id?: string;
  title?: string;
  description?: string;
  price?: string;
  image?: string;
}

export const ProductCard = ({
  id = 'p1',
  title = 'Product Title',
  description = 'Product Description',
  price = '88.00',
  image = 'https://picsum.photos/150/200'
}: Props) => {
  const navigate = useNavigate();

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { productId }
    });
  };

  const addToFavorites = () => {
    // TODO: Add to favorites functionality
  };

  return (
    <Card onClick={() => navigateToDetails(id)}>
      <img src={image} />
      <h1>{title}</h1>
      <p>{description}</p>
      <h1>{price}</h1>
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
