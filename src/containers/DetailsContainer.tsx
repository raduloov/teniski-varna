import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { Button, ButtonSize } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { QuantitySelector } from '../components/QuantitySelector';
import { RatingStars } from '../components/RatingStars';
import { SizeSelector } from '../components/SizeSelector';
import { cartActions } from '../store/cartSlice';
import { Product, TShirtSize } from '../domain/models/ProductDTO';
import { useAppDispatch } from '../hooks/useRedux';
import { toast } from 'react-toastify';

interface Props {
  product: Product;
  selectedSize: TShirtSize | null;
  onSelectSize: (size: TShirtSize) => void;
  selectedQuantity: number;
  onGoBack: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

export const DetailsContainer = ({
  selectedSize,
  onSelectSize,
  selectedQuantity,
  onGoBack,
  onIncreaseQuantity,
  onDecreaseQuantity,
  product
}: Props) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    if (!selectedSize) {
      return toast.error('Моля изберете размер за вашата тениска.');
    }

    dispatch(
      cartActions.addToCart({ product, selectedQuantity, selectedSize })
    );
    toast.success(`🎉 ${product.title} беше успешно добавен в количката.`);
  };

  return (
    <Container>
      <ActionButtonsWrapper>
        <IconButton icon={icons.FaChevronLeft} onClick={onGoBack} />
      </ActionButtonsWrapper>
      <Image src={product.image} />
      <BottomSheetContainer>
        <HeaderWrapper>
          <TitleWrapper>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
          </TitleWrapper>
          <RatingStars />
        </HeaderWrapper>
        <SelectSizeTitle>Изберете размер</SelectSizeTitle>
        <SizeAndQuantityWrapper>
          <SizeSelector
            availableSizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={(size) => onSelectSize(size)}
          />
          <QuantitySelector
            quantity={selectedQuantity}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        </SizeAndQuantityWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>Описание</DescriptionTitle>
          {/* TODO Yavor: Implement read more functionality */}
          <DescriptionContent>{product.description}</DescriptionContent>
        </DescriptionWrapper>
        <CtaWrapper>
          <Price>{product.price}лв</Price>
          <Button
            label="Добави в количката"
            size={ButtonSize.LARGE}
            onClick={addToCartHandler}
          />
        </CtaWrapper>
      </BottomSheetContainer>
    </Container>
  );
};

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const SelectSizeTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
`;

const Price = styled.p`
  font-size: 35px;
  font-weight: 800;
`;

const CtaWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
`;

const DescriptionContent = styled.p`
  color: ${Color.GRAY};
`;

const DescriptionTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const DescriptionWrapper = styled.div`
  flex-direction: column;
  margin-top: 15px;
`;

const SizeAndQuantityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 30px;
`;

const Description = styled.p`
  color: ${Color.GRAY};
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const BottomSheetContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  background: ${Color.WHITE};
  padding: 1.5rem;
  box-shadow: 0px -10px 20px -10px rgba(0, 0, 0, 0.75);
`;

const ActionButtonsWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

const Container = styled.div`
  height: 100vh;
  background: ${Color.GRAY};
`;
