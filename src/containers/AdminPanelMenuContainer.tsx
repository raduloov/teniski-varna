import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { icons } from '../assets/icons';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { ImageInput } from '../components/ImageInput';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';

const NewProductContainer = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  return (
    <Wrapper>
      <Title>Add new product</Title>
      <InputContainer>
        <Text>Title</Text>
        <Input
          placeholder={'Title...'}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Description</Text>
        <Input
          placeholder={'Description...'}
          onChange={(e) => setDescription(e.target.value)}
          password
        />
      </InputContainer>
      <InputContainer>
        <Text>Price</Text>
        <Input
          placeholder={'Price...'}
          onChange={(e) => setPrice(e.target.value)}
          password
        />
      </InputContainer>
      <InputContainer>
        <Text>Image</Text>
        <ImageInput
          file={image}
          onChange={(e) => {
            if (e.target.files && e.target.files[0].type === 'image/jpeg') {
              setImage(e.target.files[0]);
            }
          }}
        />
      </InputContainer>
      <ButtonContainer>
        <Button label={'Add new product'} />
      </ButtonContainer>
    </Wrapper>
  );
};

export const AdminPanelMenuContainer = () => {
  const [showAddNewProduct, setShowAddNewProduct] = useState<boolean>(false);
  const { signOut } = useAuth();

  return (
    <Container>
      <PanelContainer>
        <Header>
          <AdminWrapper>
            <HeaderText>Signed in as</HeaderText>
            <BoldText>test@admin.com</BoldText>
          </AdminWrapper>
          <IconButton icon={icons.FaSignOutAlt} onClick={() => signOut()} />
        </Header>
        {showAddNewProduct && <NewProductContainer />}
        {!showAddNewProduct && (
          <ButtonContainer>
            <Button
              label={'Add new product'}
              onClick={() => setShowAddNewProduct(true)}
            />
            <Button label={'Change banner image'} />
          </ButtonContainer>
        )}
      </PanelContainer>
      <BackLinkText to={'/'}>
        <p>Back to Teniski-Varna</p>
      </BackLinkText>
    </Container>
  );
};

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const BackLinkText = styled(Link)`
  text-decoration: none;
  color: ${Color.BLACK};
  padding-top: 20px;
`;

const Title = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const Wrapper = styled.div`
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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
