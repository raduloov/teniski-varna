import React, { useEffect } from 'react';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import { useAppDispatch } from '../hooks/useRedux';
import { cartActions } from '../store/cartSlice';
import { useLocation } from 'react-router';
import { ThankYouContainer } from '../containers/thankYou/ThankYouContainer';

export const ThankYouPage = () => {
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  useEffect(() => {
    if (!state || !state.fromCheckout) {
      return navigate('/');
    }

    dispatch(cartActions.clearCart());
  }, []);

  const onGoBack = () => navigate('/');

  return <ThankYouContainer onGoBack={onGoBack} />;
};
