import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { storage } from '../firebase/firebaseConfig';
import { ActivityIndicator } from './ActivityIndicator';

export const Banner = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getImage = async () => {
    const imageRef = ref(storage, `bannerImage.jpeg`);

    try {
      setIsLoading(true);
      const imageUrl = await getDownloadURL(imageRef);
      setImageUrl(imageUrl);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <BannerContainer>
      {isLoading || !imageUrl ? (
        <ActivityIndicator size={75} color={Color.ACCENT} />
      ) : (
        <img src={imageUrl} />
      )}
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: ${Color.LIGHT_GRAY};
  margin: 1.5rem;
  border-radius: 45px/50px;
  img {
    margin: auto;
    width: 100%;
    height: 100%;
    border-radius: 45px/50px;
  }
`;
