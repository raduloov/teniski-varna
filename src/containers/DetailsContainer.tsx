import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { Button, ButtonSize } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { QuantitySelector } from '../components/QuantitySelector';
import { RatingStars } from '../components/RatingStars';
import { SizeLabel, SizeSelector } from '../components/SizeSelector';
import { Product } from '../hooks/useProducts';

interface Props {
  selectedSize: SizeLabel | null;
  onSelectSize: (size: SizeLabel) => void;
  selectedQuality: number;
  onGoBack: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  product: Product;
}

export const DetailsContainer = ({
  selectedSize,
  onSelectSize,
  selectedQuality,
  onGoBack,
  onIncreaseQuantity,
  onDecreaseQuantity,
  product
}: Props) => {
  console.log(product);
  return (
    <Container>
      <ActionButtonsWrapper>
        <IconButton icon={icons.FaChevronLeft} onClick={onGoBack} />
      </ActionButtonsWrapper>
      <BottomSheetContainer>
        <HeaderWrapper>
          <TitleWrapper>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
          </TitleWrapper>
          <RatingStars />
        </HeaderWrapper>
        <SelectSizeTitle>Select Size</SelectSizeTitle>
        <SizeAndQuantityWrapper>
          <SizeSelector
            selectedSize={selectedSize}
            onSelectSize={(size) => onSelectSize(size)}
          />
          <QuantitySelector
            quantity={selectedQuality}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        </SizeAndQuantityWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>Description</DescriptionTitle>
          {/* TODO Yavor: Implement read more functionality */}
          <DescriptionContent>
            Clothing products are currently one of the best and high-quality
            clothig lines among local Brands. Collared shirt with...
          </DescriptionContent>
        </DescriptionWrapper>
        <CtaWrapper>
          <Price>${product.price}</Price>
          <Button label="Shop Now" size={ButtonSize.LARGE} />
        </CtaWrapper>
      </BottomSheetContainer>
    </Container>
  );
};

const SelectSizeTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
`;

const Price = styled.p`
  font-size: 50px;
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
