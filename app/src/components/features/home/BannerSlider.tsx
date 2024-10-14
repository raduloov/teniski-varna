import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Color } from '../../../assets/constants';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Banner, FileType, useBanners } from '../../../hooks/useBanners';

export const BannerSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [fileHasLoaded, setFileHasLoaded] = useState<boolean>(false);
  const { getBanners } = useBanners();

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
      autoplay={{ delay: 4000, disableOnInteraction: true }}
      loop
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <FileWrapper>
            {!fileHasLoaded && (
              <ActivityIndicator size={75} color={Color.ACCENT} />
            )}
            {banner.fileType === FileType.IMAGE ? (
              <Image
                src={banner.fileUrl}
                loaded={fileHasLoaded}
                onLoad={() => {
                  setFileHasLoaded(true);
                }}
                onClick={() => navigateToBannerLink(banner.redirectUrl)}
              />
            ) : (
              <Video
                src={banner.fileUrl}
                loaded={fileHasLoaded}
                autoPlay
                muted
                loop
                playsInline
                onClick={() => navigateToBannerLink(banner.redirectUrl)}
              />
            )}
          </FileWrapper>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

const FileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Video = styled.video<{ loaded: boolean }>`
  width: 100%;
  ${({ loaded }) => !loaded && 'display: none;'}
`;

const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  ${({ loaded }) => !loaded && 'display: none;'}
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 195px;
  transform: translateY(-0.5rem);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    transform: translateY(0);
    height: 350px;
    border-radius: 30px;
  }

  @media (min-width: 1366px) {
    height: 450px;
  }

  @media (min-width: 1600px) {
    height: 600px;
  }
`;
