import React from 'react';
import styled from 'styled-components';
import { Color } from '../../../assets/constants';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { icons } from '../../../assets/icons';
import { useCustomNavigate } from '../../../hooks/useCustomNavigate';

const socialMediaLinks = {
  facebook: 'https://www.facebook.com/teniskitevarna',
  tiktok: 'https://www.tiktok.com/@teniskivarna',
  instagram: 'https://www.instagram.com/teniskivarna',
  youtube: 'https://www.youtube.com/@teniskivarna'
};

const navigationItems = [
  { name: 'Начало', path: '/' },
  { name: 'Любими', path: '/favorites' },
  { name: 'За нас', path: '/about' },
  { name: 'Общи условия', path: '/terms-and-conditions' },
  { name: 'Политика за Личните Данни', path: '/privacy-policy' }
];

const NavigationItems = () => {
  const navigate = useCustomNavigate();

  return (
    <>
      {navigationItems.map((item, index) => (
        <NavigationItem onClick={() => navigate(item.path)} key={index}>
          {item.name}
        </NavigationItem>
      ))}
    </>
  );
};

export const Footer = () => {
  const navigateToSocialMedia = (url: string) => window.open(url, '_blank');

  return (
    <FooterWrapper>
      <InnerWrapper>
        <NavigationWrapper>
          <NavigationItems />
        </NavigationWrapper>

        <ContactWrapper>
          <Text>Контакти</Text>
          <Contacts>
            <ContactRow>
              <icons.FaMapMarkerAlt size={16} color={Color.DARK_GRAY} />
              <TinyText>
                г. Варна, бул. Сливница 165, ет. 0, срещу Costa кафе
              </TinyText>
            </ContactRow>
            <ContactRow>
              <icons.FaAt size={16} color={Color.DARK_GRAY} />
              <SmallText>teniski.varna2022@gmail.com</SmallText>
            </ContactRow>
            <ContactRow>
              <icons.FaPhone size={16} color={Color.DARK_GRAY} />
              <SmallText>088 822 8975</SmallText>
            </ContactRow>
          </Contacts>

          <SocialMediaWrapper>
            <SocialMediaIconWrapper
              onClick={() => navigateToSocialMedia(socialMediaLinks.facebook)}
            >
              <icons.FaFacebookF size={20} color={Color.ACCENT} />
            </SocialMediaIconWrapper>
            <SocialMediaIconWrapper
              onClick={() => navigateToSocialMedia(socialMediaLinks.tiktok)}
            >
              <icons.FaTiktok size={20} color={Color.ACCENT} />
            </SocialMediaIconWrapper>
            <SocialMediaIconWrapper
              onClick={() => navigateToSocialMedia(socialMediaLinks.instagram)}
            >
              <icons.FaInstagram size={20} color={Color.ACCENT} />
            </SocialMediaIconWrapper>
            <SocialMediaIconWrapper
              onClick={() => navigateToSocialMedia(socialMediaLinks.youtube)}
            >
              <icons.FaYoutube size={20} color={Color.ACCENT} />
            </SocialMediaIconWrapper>
          </SocialMediaWrapper>
          <SmallText>© Тениски Варна 2024</SmallText>
        </ContactWrapper>

        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </InnerWrapper>
    </FooterWrapper>
  );
};

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 8px 0 8px 0;
`;

const ContactRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
  gap: 5px;
`;

const SocialMediaIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.DARK_GRAY};
  border-radius: 50%;
  padding: 5px;
`;

const SocialMediaWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

const TinyText = styled.p`
  font-size: 10px;
`;

const SmallText = styled.p`
  font-size: 12px;
`;

const Text = styled.p`
  font-size: 14px;
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigationItem = styled.p`
  font-size: 14px;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  svg {
    width: 3.5rem;
  }
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  max-width: 1200px;
  align-self: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100svw;
  padding: 1rem 1.5rem;
  color: ${Color.DARK_GRAY};
  background-color: ${Color.ACCENT};
`;
