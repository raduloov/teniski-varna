import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, getDocs } from '@firebase/firestore';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { db, storage } from '../../../firebase/firebaseConfig';
import { ActivityIndicator } from '../../common/ActivityIndicator';

export const Banner = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [bannerLink, setBannerLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const getImage = async () => {
    const imageRef = ref(storage, `bannerImage.jpeg`);
    const bannerLinkRef = collection(db, 'bannerLink');

    try {
      setIsLoading(true);
      const imageUrl = await getDownloadURL(imageRef);
      const bannerLink = await getDocs(bannerLinkRef);
      setImageUrl(imageUrl);
      setBannerLink(bannerLink.docs[0].data().bannerLink);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setStartAnimation(true);
      }, 1500);
    }
  }, [isLoading]);

  const navigateToBannerLink = () =>
    bannerLink && window.open(bannerLink, '_self');

  return (
    <BannerContainer startAnimation={startAnimation}>
      {isLoading || !imageUrl ? (
        <ActivityIndicator size={75} color={Color.ACCENT} />
      ) : (
        <img src={imageUrl} onClick={navigateToBannerLink} />
      )}
    </BannerContainer>
  );
};

const BannerContainer = styled.div<{ startAnimation: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 195px;
  transform: translateY(-0.5rem);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: 100%;
    ${({ startAnimation }) => startAnimation && `animation: slideleft 1.5s;`}
  }
  @keyframes slideleft {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-50px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
