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

  return (
    <BannerContainer>
      {isLoading || !imageUrl ? (
        <ActivityIndicator size={75} color={Color.ACCENT} />
      ) : (
        <a href={bannerLink ?? ''}>
          <img src={imageUrl} />
        </a>
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
