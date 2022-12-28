import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { TShirtSize } from '../../domain/models/ProductDTO';
import { db, storage } from '../../firebase/firebaseConfig';
import { Color } from '../../assets/constants';
import { ImageInput } from '../../components/common/ImageInput';
import { Checkbox } from '../../components/common/Checkbox';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  ColorImages,
  defaultImagesObj,
  defaultSizesObj,
  SizesCheckbox,
  supportedImageTypes
} from './utils';

export const NewProductContainer = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [images, setImages] = useState<ColorImages>(defaultImagesObj);
  const [sizes, setSizes] = useState<SizesCheckbox>(defaultSizesObj);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imagesAreNotSelected = Object.values(images).includes(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setImages(defaultImagesObj);
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

  const uploadImages = async () => {
    if (imagesAreNotSelected) {
      return;
    }

    for await (const [color, image] of Object.entries(images)) {
      const storageRef = ref(storage, `images/${title}-${color}`);
      await uploadBytes(storageRef, image);
      console.log(`${title}-${color} uploaded`);
    }
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
    if (imagesAreNotSelected) {
      return toast.error(
        '💥 Please add an image for each color of your product.'
      );
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
      await uploadImages();

      resetForm();
      return toast.success('🎉 Product added successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <Text>Images</Text>
        <ImageInputContainer>
          <ImageInputWrapper>
            <SmallText>⬜️ White</SmallText>
            <ImageInput
              fileName={images?.white?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) =>
                e.target.files &&
                setImages({ ...images, white: e.target.files[0] })
              }
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>⬛️ Black</SmallText>
            <ImageInput
              fileName={images?.black?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) =>
                e.target.files &&
                setImages({ ...images, black: e.target.files[0] })
              }
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>🟥 Red</SmallText>
            <ImageInput
              fileName={images?.red?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) =>
                e.target.files &&
                setImages({ ...images, red: e.target.files[0] })
              }
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>🟦 Blue</SmallText>
            <ImageInput
              fileName={images?.blue?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) =>
                e.target.files &&
                setImages({ ...images, blue: e.target.files[0] })
              }
            />
          </ImageInputWrapper>
        </ImageInputContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

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

const SmallText = styled.p`
  color: ${Color.WHITE};
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Title = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
