import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';

interface Props {
  onGoBack: () => void;
}

export const ThankYouContainer = ({ onGoBack }: Props) => {
  return (
    <Wrapper>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Row>
        <Text>Благодарим Ви за поръчката!</Text>
        <RedHeartIcon src={require('../../assets/images/redHeartIcon.png')} />
      </Row>
      <SmallText>
        Плащането беше успешно, очаквайте имейл с повече информация относно
        поръчката и доставката Ви!
      </SmallText>
      <ReturnButtonWrapper onClick={onGoBack}>
        <icons.FaChevronLeft size={14} color={Color.DARK_GRAY} />
        <ReturnButtonText>Обратно към Teniski Varna</ReturnButtonText>
      </ReturnButtonWrapper>
    </Wrapper>
  );
};

const ReturnButtonText = styled.p`
  font-size: 0.9rem;
  color: ${Color.DARK_GRAY};
  text-decoration: underline;
  cursor: pointer;
`;

const ReturnButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const RedHeartIcon = styled.img`
  width: 30px;
`;

const SmallText = styled.p`
  font-size: 1rem;
  text-align: center;
  color: ${Color.DARK_GRAY};
`;

const Text = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LogoContainer = styled.div`
  width: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
`;
