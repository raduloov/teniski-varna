import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { IconButton } from '../components/common/IconButton';
import { CheckoutContainer } from '../containers/CheckoutContainer';
import { icons } from '../assets/icons';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BackButtonContainer>
        <IconButton
          onClick={() => navigate(-1)}
          icon={icons.FaChevronLeft}
        ></IconButton>
      </BackButtonContainer>
      <PayPalScriptProvider
        options={{
          'client-id':
            'Adgg55cmHV7y2my9mNpsq-7l-hsf3fbTFOdupd67ppkdlVAqhaE8QlBSzitg2By11Vtw5S-I6Onj41N4&currency=EUR'
        }}
      >
        <CheckoutContainer />
      </PayPalScriptProvider>
    </div>
  );
};
const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  margin-left: 2rem;
  margin-top: 2rem;
`;
