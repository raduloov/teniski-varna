import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { Button, ButtonSize, ButtonType } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { ImageInput } from '../components/ImageInput';
import { Input } from '../components/Input';
import { TShirtSize } from '../domain/models/ProductDTO';
import { db, storage } from '../firebase/firebaseConfig';
import { useAuth } from '../hooks/useAuth';

interface SizesCheckbox {
  S: boolean;
  M: boolean;
  L: boolean;
  XL: boolean;
}

const defaultSizesObj: SizesCheckbox = {
  S: false,
  M: false,
  L: false,
  XL: false
};
const supportedImageTypes = ['image/jpeg'];

const NewProductContainer = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [image, setImage] = useState<File | null>(null);
  const [sizes, setSizes] = useState<SizesCheckbox>(defaultSizesObj);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setImage(null);
    setSizes(defaultSizesObj);
  };

  const createProduct = async () => {
    const sizesArray: TShirtSize[] = [];
    for (const [size, selected] of Object.entries(sizes)) {
      if (selected) {
        sizesArray.push(size as TShirtSize);
      }
    }

    const product = {
      title,
      description,
      price,
      image: title,
      sizes: sizesArray,
      colors: []
    };

    await addDoc(collection(db, 'products'), product);
  };

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    const storageRef = ref(storage, `images/${title}`);
    await uploadBytes(storageRef, image);
  };

  const addNewProduct = async () => {
    if (!title) {
      return toast.error('💥 Please add a title for your product!');
    }
    if (!description) {
      return toast.error('💥 Please add a description for your product.');
    }
    if (!price) {
      return toast.error('💥 Please add a price for your product.');
    }
    if (!image) {
      return toast.error('💥 Please add an image for your product.');
    }
    const hasSize = Object.values(sizes).filter((selected) => selected).length;
    if (!hasSize) {
      return toast.error(
        '💥 Please choose at least one size for your product.'
      );
    }

    setIsLoading(true);
    try {
      await createProduct();
      await uploadImage();

      resetForm();
      return toast.success('🎉 Product added successfully!');
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Add new product</Title>
      <InputContainer>
        <Text>Title</Text>
        <Input
          value={title}
          placeholder={'Title...'}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Description</Text>
        <Input
          value={description}
          placeholder={'Description...'}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Price</Text>
        <Input
          value={price}
          placeholder={'Price...'}
          type={'number'}
          onChange={(e) => setPrice(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Image</Text>
        <ImageInput
          fileName={image?.name}
          supportedTypes={supportedImageTypes}
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
      </InputContainer>
      <InputContainer>
        <Text>T-Shirt Sizes</Text>
        <SizesContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.S}
              checked={sizes.S}
              onClick={() => setSizes((sizes) => ({ ...sizes, S: !sizes.S }))}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.M}
              checked={sizes.M}
              onClick={() => setSizes((sizes) => ({ ...sizes, M: !sizes.M }))}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.L}
              checked={sizes.L}
              onClick={() => setSizes((sizes) => ({ ...sizes, L: !sizes.L }))}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.XL}
              checked={sizes.XL}
              onClick={() => setSizes((sizes) => ({ ...sizes, XL: !sizes.XL }))}
            />
          </CheckboxContainer>
        </SizesContainer>
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Add new product'}
          loading={isLoading}
          onClick={addNewProduct}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

const ChangeBannerImageContainer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateBannerImage = async () => {
    if (!image) {
      return toast.error('💥 Please add a banner image to update.');
    }

    setIsLoading(true);

    const storageRef = ref(storage, `bannerImage.jpeg`);
    try {
      await uploadBytes(storageRef, image);

      setImage(null);
      return toast.success('🎉 Banner image updated successfully!');
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Change banner image</Title>
      <InputContainer>
        <Text>Banner image</Text>
        <ImageInput
          fileName={image?.name}
          supportedTypes={supportedImageTypes}
          onChange={(e) => {
            e.target.files && setImage(e.target.files[0]);
            console.log('a');
          }}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Update banner image'}
          loading={isLoading}
          onClick={updateBannerImage}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

export const AdminPanelMenuContainer = () => {
  const [showAddNewProduct, setShowAddNewProduct] = useState<boolean>(false);
  const [showChangeBannerImage, setShowChangeBannerImage] =
    useState<boolean>(false);
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
        {showChangeBannerImage && <ChangeBannerImageContainer />}
        {!showAddNewProduct && !showChangeBannerImage && (
          <ButtonContainer>
            <Button
              label={'Add new product'}
              onClick={() => setShowAddNewProduct(true)}
            />
            <Button
              label={'Change banner image'}
              onClick={() => setShowChangeBannerImage(true)}
            />
          </ButtonContainer>
        )}
      </PanelContainer>
      {(showAddNewProduct || showChangeBannerImage) && (
        <BackToMenuText
          onClick={() => {
            setShowAddNewProduct(false);
            setShowChangeBannerImage(false);
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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

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

const BackToMenuText = styled.a`
  text-decoration: none;
  color: ${Color.BLACK};
  padding-top: 20px;
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
