import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { cartActions } from '../../../store/cartSlice';
import { QuantitySelector } from '../details/QuantitySelector';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { useAppDispatch } from '../../../hooks/useRedux';

interface Props {
  product: CartProduct;
}

export const CartProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { productId }
    });
  };

  const increaseQuantity = () => {
    dispatch(cartActions.addToCart({ product }));
  };

  const decreaseQuantity = () => {
    dispatch(cartActions.removeFromCart({ product }));
  };

  return (
    <Card onClick={() => navigateToDetails(product.id)}>
      <img src={product.image} />
      <ProductDetails>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Размер: {product.size}</p>
        <h1>
          {product.price}лв
          <QuantitySelector
            quantity={product.quantity}
            onIncreaseQuantity={(e?: React.MouseEvent) => {
              e?.stopPropagation();
              increaseQuantity();
            }}
            onDecreaseQuantity={(e?: React.MouseEvent) => {
              e?.stopPropagation();
              decreaseQuantity();
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
    width: 100px;
    height: 100px;
    background-size: cover;
    object-fit: cover;
    border-radius: 10px;
  }
  h1 {
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
  }
  p {
    color: ${Color.GRAY};
    font-size: 0.8rem;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-left: 1rem;
  word-break: break-all;

  h1:last-child {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-top: auto;
    justify-items: space-between;
  }
  button {
    padding: 0 8px 0 8px;
  }
`;
