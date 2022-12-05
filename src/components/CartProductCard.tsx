import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { IconButton } from './IconButton';
import { QuantitySelector } from './QuantitySelector';

interface Props {
  id?: string;
  title?: string;
  description?: string;
  price?: string;
  image?: string;
}

export const CartProductCard = ({
  id = 'p1',
  title = 'Product Title',
  description = 'Product Description',
  price = '29.99',
  image = 'https://picsum.photos/100/100'
}: Props) => {
  const navigate = useNavigate();

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { productId }
    });
  };

  return (
    <Card onClick={() => navigateToDetails(id)}>
      <img src={image} />
      <ProductDetails>
        <h1>{title}</h1>
        <p>{description}</p>
        <h1>
          ${price}
          <QuantitySelector
            quantity={0}
            onIncreaseQuantity={(e?: React.MouseEvent) => {
              e?.stopPropagation();
              console.log('Increase quantity');
            }}
            onDecreaseQuantity={(e?: React.MouseEvent) => {
              e?.stopPropagation();
              console.log('Decrease quantity');
            }}
          />
        </h1>
      </ProductDetails>
    </Card>
  );
};

const Card = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
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
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-left: 1rem;

  h1:last-child {
    display: flex;
    flex-wrap: wrap;
    margin-top: auto;
    justify-items: space-between;
  }
  button {
    padding: 0 8px 0 8px;
  }
`;
