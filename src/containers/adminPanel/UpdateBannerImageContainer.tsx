import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button } from '../../components/common/Button';
import { ImageInput } from '../../components/common/ImageInput';
import { storage } from '../../firebase/firebaseConfig';
import { supportedImageTypes } from './utils';

export const UpdateBannerImageContainer = () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
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
