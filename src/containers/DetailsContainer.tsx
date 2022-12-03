import React from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { Button, ButtonSize } from '../components/Button';
import { IconButton } from '../components/IconButton';

export const DetailsContainer = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container>
      <ActionButtonsWrapper>
        <IconButton icon={icons.FaChevronLeft} onClick={goBack} />
      </ActionButtonsWrapper>
      <BottomSheetContainer>
        <HeaderWrapper>
          <TitleWrapper>
            <Title>Nike Jumpman</Title>
            <Description>Men&apos;s Gillet</Description>
          </TitleWrapper>
          {/* TODO Yavor: Create rating stars component */}
        </HeaderWrapper>
        {/* TODO Yavor: Create size select component */}
        <DescriptionWrapper>
          <DescriptionTitle>Description</DescriptionTitle>
          <DescriptionContent>
            Clothing products are currently one of the best and high-quality
            clothig lines among local Brands. Collared shirt with...
          </DescriptionContent>
        </DescriptionWrapper>
        <CtaWrapper>
          <Price>88.8</Price>
          <Button label="Shop Now" size={ButtonSize.LARGE} />
        </CtaWrapper>
      </BottomSheetContainer>
    </Container>
  );
};

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
`;

const TitleWrapper = styled.div`
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
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
  height: 45%;
  width: 100%;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  background: ${Color.WHITE};
  padding: 2rem;
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
