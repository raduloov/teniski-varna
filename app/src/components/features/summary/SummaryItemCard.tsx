import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { CartProduct } from '../../../domain/mappers/cartProductMapper';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import {
  translateColorToBulgarian,
  translateTypeToBulgarian
} from '../cart/utils';

interface Props {
  product: CartProduct;
}

export const SummaryItemCard = ({ product }: Props) => {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  const navigate = useCustomNavigate();

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { color: product.color, type: product.type }
    });
  };

  return (
    <Card onClick={() => navigateToDetails(product.id)}>
      <ImageWrapper>
        {!imageHasLoaded && (
          <ActivityIndicator size={100} color={Color.ACCENT} />
        )}
        <Image
          src={product.image}
          onLoad={() => setImageHasLoaded(true)}
          loaded={imageHasLoaded}
        />
      </ImageWrapper>
      <ProductDetails>
        <Column>
          <h1>{product.title}</h1>
          <TextRow>
            <Text>Цвят:</Text>
            <BoldText>{translateColorToBulgarian(product.color)}</BoldText>
          </TextRow>
          <TextRow>
            <Text>Модел:</Text>
            <BoldText>{translateTypeToBulgarian(product.type)}</BoldText>
          </TextRow>
          <TextRow>
            <Text>Размер:</Text>
            <BoldText>{product.size}</BoldText>
          </TextRow>
        </Column>
        <PriceWrapper>
          <Price>{product.price}лв</Price>
        </PriceWrapper>
      </ProductDetails>
    </Card>
  );
};

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img<{ loaded: boolean }>`
  ${({ loaded }) => !loaded && 'display: none;'}
`;

const Text = styled.p`
  color: ${Color.GRAY};
  font-size: 0.9rem;
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

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 1rem;
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
  transition: ease-out 0.2s;
  img {
    width: 100px;
    height: 100px;
    background-size: cover;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  margin-left: 1rem;
  word-break: break-all;
`;
