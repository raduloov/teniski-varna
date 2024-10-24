import React, { useEffect } from 'react';
import { useCustomNavigate } from '../hooks/useCustomNavigate';
import { useAppDispatch } from '../hooks/useRedux';
import { cartActions } from '../store/cartSlice';
import { useLocation } from 'react-router';
import { ThankYouContainer } from '../containers/thankYou/ThankYouContainer';
import { useMailgun } from '../hooks/useMailgun';

export const ThankYouPage = () => {
  const navigate = useCustomNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { sendEmail } = useMailgun();

  const sendEmailToCustomer = async () =>
    await sendEmail(
      'raduloov@gmail.com',
      'Поръчка от Teniski Varna',
      'Благодарим Ви за поръчката!',
      'Плащането беше успешно, очаквайте имейл с повече информация относно поръчката и доставката Ви!'
    );

  useEffect(() => {
    if (!state || !state.fromCheckout) {
      return navigate('/');
    }

    dispatch(cartActions.clearCart());
    sendEmailToCustomer();
  }, []);

  const onGoBack = () => navigate('/');

  return <ThankYouContainer onGoBack={onGoBack} />;
};
