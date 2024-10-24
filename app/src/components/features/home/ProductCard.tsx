import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { icons } from '../../../assets/icons';
import { Product } from '../../../domain/models/ProductDTO';
import { IconButton } from '../../common/IconButton';
import { getDiscountedPrice } from '../../../containers/adminPanel/utils';
import { productAppearAnimation } from '../../../utils/animations';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';
import { toast } from 'react-toastify';

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
  const navigate = useCustomNavigate();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('Favorites') || '[]')
  );

  const discountedPrice = getDiscountedPrice(product.price, discount);

  const navigateToDetails = (productId: string) => {
    navigate(`/products/${productId}`, {
      state: { discountedPrice }
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
      toast.success('Продуктът беше премахнат от любими', {
        icon: (
          <ToastIcon
            src={require('../../../assets/images/brokenHeartIcon.png')}
          />
        )
      });
    } else {
      localStorage.setItem(
        'Favorites',
        JSON.stringify([...favoritesArray, product])
      );
      setFavorites([...favoritesArray, product]);
      toast.success('Продуктът беше добавен в любими', {
        icon: (
          <ToastIcon src={require('../../../assets/images/redHeartIcon.png')} />
        )
      });
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
      <img src={product.thumbnail.url} />
      <Title>{product.title}</Title>
      <FavoriteButton>
        <PriceWrapper>
          <Price discounted={!!discount}>{product.price}лв</Price>
          {discount && <DiscountedPrice>{discountedPrice}лв</DiscountedPrice>}
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

const ToastIcon = styled.img`
  width: 24px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.h1<{ discounted?: boolean }>`
  ${({ discounted }) =>
    discounted &&
    `
      font-size: 14px;
      text-decoration: line-through;
      color: ${Color.GRAY}
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
    font-size: 0.9rem;
  }
  ${productAppearAnimation}

  @media (min-width: 768px) {
    width: 180px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 1366px) {
    width: 220px;
  }

  @media (min-width: 1600px) {
    width: 250px;
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

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${Color.BLACK};
`;
