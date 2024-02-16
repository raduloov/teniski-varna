import React, { useEffect, useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button } from '../../components/common/Button';
import { ImageInput } from '../../components/common/ImageInput';
import { db, storage } from '../../firebase/firebaseConfig';
import { supportedImageTypes } from './utils';
import { Input } from '../../components/common/Input';
import { collection, doc, getDocs, updateDoc } from '@firebase/firestore';

export const UpdateBannerImageContainer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [bannerLink, setBannerLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBannerLink = async () => {
    const bannerLinkRef = collection(db, 'bannerLink');
    const bannerLink = await getDocs(bannerLinkRef);

    setBannerLink(bannerLink.docs[0].data().bannerLink);
  };

  useEffect(() => {
    getBannerLink();
  }, []);

  const updateBannerImage = async () => {
    if (!image) {
      return;
    }

    setIsLoading(true);

    const storageRef = ref(storage, `bannerImage.jpeg`);
    try {
      await uploadBytes(storageRef, image);
      setImage(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
      toast.success('🎉 Banner image updated successfully!');
    }
  };

  const updateBannerLink = async () => {
    if (!bannerLink) {
      return toast.error('💥 Please add a banner link to update.');
    }

    setIsLoading(true);

    try {
      await updateDoc(doc(db, 'bannerLink', '1'), { bannerLink });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
      toast.success('🎉 Banner link updated successfully!');
    }
  };

  const updateBanner = () => {
    updateBannerImage();
    updateBannerLink();
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
          }}
        />
        <Text>Banner link</Text>
        <Input
          value={bannerLink}
          placeholder={'Banner link...'}
          onChange={(e) => setBannerLink(e.target.value)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Update banner'}
          loading={isLoading}
          onClick={updateBanner}
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
