import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { cartActions } from '../../../store/cartSlice';
import { QuantitySelector } from '../details/QuantitySelector';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { useAppDispatch } from '../../../hooks/useRedux';
import { translateColorToBulgarian, translateTypeToBulgarian } from './utils';
import { RiCloseFill } from 'react-icons/ri';

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
        <RemoveButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(cartActions.removeFromCart({ product, remove: true }));
          }}
        >
          <RiCloseFill color={Color.GRAY} size={24} />
        </RemoveButton>
        <h1>{product.title}</h1>
        <Row>
          <TextRow>
            <Text>Цвят:</Text>
            <BoldText>{translateColorToBulgarian(product.color)}</BoldText>
          </TextRow>
          <TextRow>
            <Text>Модел:</Text>
            <BoldText>{translateTypeToBulgarian(product.type)}</BoldText>
          </TextRow>
        </Row>
        <TextRow>
          <Text>Размер:</Text>
          <BoldText>{product.size}</BoldText>
        </TextRow>
        <PriceAndQuantityWrapper>
          <Price>{product.price}лв</Price>
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
        </PriceAndQuantityWrapper>
      </ProductDetails>
    </Card>
  );
};

const RemoveButton = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`;

const Text = styled.p`
  color: ${Color.GRAY};
  font-size: 0.9rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextRow = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const BoldText = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
`;

const PriceAndQuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-left: 1rem;
  word-break: break-all;
`;
