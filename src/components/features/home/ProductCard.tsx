import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import { Product } from '../../../domain/models/ProductDTO';
import { IconButton } from '../../common/IconButton';
import { getDiscountedPrice } from '../../../containers/adminPanel/utils';

interface Props {
  product: Product;
  discount?: number;
  onSelectProductToEdit?: (productId: string) => void;
}

export const ProductCard = ({
  product,
  discount,
  onSelectProductToEdit
}: Props) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('Favorites') || '[]')
  );

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { productId }
    });
  };

  const addToFavorites = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const favorites = localStorage.getItem('Favorites');
    const favoritesArray = JSON.parse(favorites ?? '[]');
    if (favoritesArray.find((item: Product) => item.id === product.id)) {
      const newFavorites = favoritesArray.filter(
        (item: Product) => item.id !== product.id
      );
      localStorage.setItem('Favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } else {
      localStorage.setItem(
        'Favorites',
        JSON.stringify([...favoritesArray, product])
      );
      setFavorites([...favoritesArray, product]);
    }
  };

  const isFavorite = favorites.find((item: Product) => item.id === product.id);

  return (
    <Card
      onClick={() =>
        onSelectProductToEdit
          ? onSelectProductToEdit(product.id)
          : navigateToDetails(product.id)
      }
    >
      <img src={product.images.white} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <FavoriteButton>
        <PriceWrapper>
          <OriginalPrice discounted={!!discount}>
            {product.price}лв
          </OriginalPrice>
          {discount && (
            <DiscountedPrice>
              {getDiscountedPrice(product.price, discount)}лв
            </DiscountedPrice>
          )}
        </PriceWrapper>
        {onSelectProductToEdit && <IconButton icon={icons.FaEdit} />}
        {!onSelectProductToEdit && isFavorite && (
          <IconButton icon={icons.FcLike} onClick={addToFavorites} />
        )}
        {!onSelectProductToEdit && !isFavorite && (
          <IconButton icon={icons.FaRegHeart} onClick={addToFavorites} />
        )}
      </FavoriteButton>
    </Card>
  );
};

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OriginalPrice = styled.h1<{ discounted?: boolean }>`
  ${({ discounted }) =>
    discounted &&
    `
    font-size: 14px;
    text-decoration: line-through;
  `}
`;

const DiscountedPrice = styled.h1`
  color: ${Color.RED};
  font-size: 18px;
`;

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
    width: 100px;
    height: 150px;
    margin: auto;
    background-size: cover;
    object-fit: cover;
    border-radius: 10px;
  }
  h1 {
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }
  p {
    color: ${Color.GRAY};
    font-size: 0.9rem;
  }
`;

const FavoriteButton = styled.div`
  display: flex;
  justify-content: space-between;
  bottom: 0.5rem;
  right: 0.5rem;
  h1 {
    margin-top: auto;
  }
`;
