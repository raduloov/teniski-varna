import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Color } from '../../../assets/constants';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Banner, useBanners } from '../../../hooks/useBanners';

export const BannerSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const { getBanners, isFetchingBanners } = useBanners();

  const setBannersFromFirebase = async () => {
    const banners = await getBanners();
    setBanners(banners);
  };

  useEffect(() => {
    setBannersFromFirebase();
  }, []);

  const navigateToBannerLink = (url: string) =>
    url && window.open(url, '_self');

  return (
    <StyledSwiper
      modules={[Autoplay]}
      autoplay={{ delay: 2500, disableOnInteraction: true }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          {isFetchingBanners || !banner.imageUrl ? (
            <ActivityIndicator size={75} color={Color.ACCENT} />
          ) : (
            <Image
              src={banner.imageUrl}
              onClick={() => navigateToBannerLink(banner.redirectUrl)}
            />
          )}
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 195px;
  transform: translateY(-0.5rem);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
`;
