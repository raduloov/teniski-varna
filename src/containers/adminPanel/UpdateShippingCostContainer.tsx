import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button } from '../../components/common/Button';
import { db } from '../../firebase/firebaseConfig';
import { Input } from '../../components/common/Input';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

export const UpdateShippingCostContainer = () => {
  const [shippingCost, setShippingCost] = useState<string>('');
  const [minimumAmount, setMinimumAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getShippingCost = async () => {
    const shippingRef = doc(db, 'shipping', '1');
    const shipping = await getDoc(shippingRef);

    if (shipping.exists()) {
      setShippingCost(shipping.data().shippingCost);
      setMinimumAmount(shipping.data().minimumAmount);
    }
  };

  useEffect(() => {
    getShippingCost();
  }, []);

  const updateShippingCost = async () => {
    if (!shippingCost) {
      return toast.error('💥 Please add a shipping cost to update.');
    }

    setIsLoading(true);

    try {
      await updateDoc(doc(db, 'shipping', '1'), {
        shippingCost: Number(shippingCost)
      });
      await updateDoc(doc(db, 'shipping', '1'), {
        minimumAmount: Number(minimumAmount)
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
      toast.success('🎉 Shipping cost updated successfully!');
    }
  };

  const updateBanner = () => {
    updateShippingCost();
  };

  return (
    <Wrapper>
      <Title>Update shipping cost</Title>
      <InputContainer>
        <Text>Shipping cost</Text>
        <Input
          value={shippingCost}
          type={'number'}
          placeholder={'Shipping cost...'}
          onChange={(e) => setShippingCost(e.target.value)}
        />
        <Text>Minimum amount for free shipping</Text>
        <Input
          value={minimumAmount}
          type={'number'}
          placeholder={'Minimum amount...'}
          onChange={(e) => setMinimumAmount(e.target.value)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Update shipping cost'}
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
