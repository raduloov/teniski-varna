import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button, ButtonSize, ButtonType } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { NewProductContainer } from './NewProductContainer';
import { UpdateBannerImageContainer } from './UpdateBannerImageContainer';
import { UpdateProductContainer } from './UpdateProductContainer';
import { LabelsContainer } from './LabelsContainer';
import { DiscountsContainer } from './DiscountsContainer';

export const AdminPanelMenuContainer = () => {
  const [showAddNewProduct, setShowAddNewProduct] = useState<boolean>(false);
  const [showUpdateBannerImage, setShowUpdateBannerImage] =
    useState<boolean>(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const [showDiscounts, setShowDiscounts] = useState<boolean>(false);
  const { signOut } = useAuth();

  return (
    <Container>
      <PanelContainer>
        <Header>
          <AdminWrapper>
            <HeaderText>Signed in as</HeaderText>
            <BoldText>test@admin.com</BoldText>
          </AdminWrapper>
          <Button
            label={'Sign out'}
            type={ButtonType.SECONDARY}
            size={ButtonSize.SMALL}
            backgroundColor={Color.WHITE}
            onClick={() => signOut()}
          />
        </Header>
        {showAddNewProduct && <NewProductContainer />}
        {showUpdateProduct && <UpdateProductContainer />}
        {showUpdateBannerImage && <UpdateBannerImageContainer />}
        {showLabels && <LabelsContainer />}
        {showDiscounts && <DiscountsContainer />}
        {!showAddNewProduct &&
          !showUpdateProduct &&
          !showLabels &&
          !showDiscounts &&
          !showUpdateBannerImage && (
            <ButtonContainer>
              <Button
                label={'Add new product'}
                onClick={() => setShowAddNewProduct(true)}
              />
              <Button
                label={'Update existing product'}
                onClick={() => setShowUpdateProduct(true)}
              />
              <Button
                label={'Labels / Categories'}
                onClick={() => setShowLabels(true)}
              />
              <Button
                label={'Discounts'}
                onClick={() => setShowDiscounts(true)}
              />
              <Button
                label={'Update banner image'}
                onClick={() => setShowUpdateBannerImage(true)}
              />
            </ButtonContainer>
          )}
      </PanelContainer>
      {(showAddNewProduct ||
        showUpdateProduct ||
        showLabels ||
        showDiscounts ||
        showUpdateBannerImage) && (
        <BackToMenuText
          onClick={() => {
            setShowAddNewProduct(false);
            setShowUpdateProduct(false);
            setShowUpdateBannerImage(false);
            setShowLabels(false);
            setShowDiscounts(false);
          }}
        >
          <p>Back to Menu</p>
        </BackToMenuText>
      )}
      <BackLinkText to={'/'}>
        <p>Back to Teniski-Varna</p>
      </BackLinkText>
    </Container>
  );
};

const BackToMenuText = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${Color.BLACK};
  padding-top: 20px;
`;

const BackLinkText = styled(Link)`
  text-decoration: none;
  color: ${Color.BLACK};
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const BoldText = styled.p`
  font-weight: bold;
  color: ${Color.WHITE};
`;

const HeaderText = styled.p`
  color: ${Color.WHITE};
`;

const PanelContainer = styled.div`
  width: 90%;
  background: ${Color.MEDIUM_GRAY};
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 20px;
  margin-top: 20px;
`;

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px ${Color.WHITE} solid;
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
