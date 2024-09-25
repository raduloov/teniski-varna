import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { EdittableAndSelectableItems } from '../../components/common/EdittableAndSelectableItems';
import { Color } from '../../assets/constants';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from '@firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { PromoCode, usePromoCodes } from '../../hooks/usePromoCodes';

export const PromoCodesContainer = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [newPromoCodeName, setNewPromoCodeName] = useState<string>('');
  const [newPromoCodePercentage, setNewPromoCodePercentage] =
    useState<number>(0);
  const [promoCodeIdToEdit, setPromoCodeIdToEdit] = useState<string | null>(
    null
  );
  const [isDeletingPromoCode, setIsDeletingPromoCode] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getPromoCodes, isLoading: isFetchingPromoCodes } = usePromoCodes();

  const setPromoCodesFromFirebase = async () => {
    const fetchedPromoCodes = await getPromoCodes();
    setPromoCodes(fetchedPromoCodes);
  };

  useEffect(() => {
    setPromoCodesFromFirebase();
  }, []);

  const handleAddNewPromoCode = async () => {
    if (newPromoCodeName === '') {
      return;
    }

    if (promoCodes.some((promoCode) => promoCode.name === newPromoCodeName)) {
      toast.error('Promo code with that name already exists');
      return;
    }

    setIsLoading(true);

    const newPromoCode = {
      name: newPromoCodeName,
      percentage: newPromoCodePercentage
    };

    try {
      await addDoc(collection(db, 'promoCodes'), newPromoCode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setPromoCodesFromFirebase();
      resetForm();
      setIsLoading(false);
    }
  };

  const handleEditExistingPromoCode = async () => {
    const promoCodeToEdit = promoCodes.find(
      (promoCode) => promoCode.id === promoCodeIdToEdit
    );

    if (!promoCodeIdToEdit || !promoCodeToEdit) {
      resetForm();
      return toast.error(
        `Cannot find existing promo code with ID: ${promoCodeIdToEdit}`
      );
    }

    if (
      newPromoCodeName === promoCodeToEdit.name &&
      newPromoCodePercentage === promoCodeToEdit.percentage
    ) {
      resetForm();
      return toast.info(
        `No changes made to exising promo code: ${promoCodeToEdit.name}`
      );
    }

    try {
      await updateDoc(doc(db, 'promoCodes', promoCodeIdToEdit), {
        id: promoCodeIdToEdit,
        name: newPromoCodeName,
        percentage: newPromoCodePercentage
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setPromoCodesFromFirebase();
      setIsLoading(false);
    }

    resetForm();
  };

  const handleDeletePromoCode = async (promoCodeId: string) => {
    setIsDeletingPromoCode(true);

    try {
      await deleteDoc(doc(db, 'promoCodes', promoCodeId));

      toast.success('🎉 Promo code deleted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsDeletingPromoCode(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setPromoCodesFromFirebase();
      setIsDeletingPromoCode(false);
      resetForm();
    }
  };

  const handleStartEditingPromoCode = (promoCode: PromoCode) => {
    setPromoCodeIdToEdit(promoCode.id);
    setNewPromoCodeName(promoCode.name);
    setNewPromoCodePercentage(promoCode.percentage);
  };

  const resetForm = () => {
    setPromoCodeIdToEdit(null);
    setNewPromoCodeName('');
    setNewPromoCodePercentage(0);
    setIsLoading(false);
  };

  const handleActionButtonFunction = !promoCodeIdToEdit
    ? handleAddNewPromoCode
    : handleEditExistingPromoCode;

  const actionButtonLabel = promoCodeIdToEdit
    ? 'Edit promo code'
    : 'Add promo code';

  return (
    <Wrapper>
      <Text>Promo codes</Text>
      <EdittableAndSelectableItems
        items={promoCodes}
        isFetchingItems={isFetchingPromoCodes}
        // @ts-ignore
        handleStartEditingItem={handleStartEditingPromoCode}
      />
      <Text>{actionButtonLabel}</Text>
      <InputContainer>
        <NewPromoCodeNameInput>
          <Input
            value={newPromoCodeName}
            placeholder={'PROMO_CODE'}
            type={'text'}
            onChange={(e) => setNewPromoCodeName(e.target.value)}
          />
        </NewPromoCodeNameInput>
        <NewPromoCodeIndexInput>
          <Input
            value={newPromoCodePercentage}
            placeholder={'Discount...'}
            type={'number'}
            min={0}
            onChange={(e) => {
              // TODO: Currently working but should be able to delete the initial 0, making it possible to write 1 instead of 01
              setNewPromoCodePercentage(Number(e.target.value));
            }}
          />
          <Text>%</Text>
        </NewPromoCodeIndexInput>
      </InputContainer>
      <ButtonContainer>
        <Button
          label={actionButtonLabel}
          disabled={newPromoCodeName === ''}
          loading={isLoading}
          onClick={handleActionButtonFunction}
        />
        {promoCodeIdToEdit && (
          <Button
            label={'Delete promo code'}
            backgroundColor={Color.RED}
            loading={isDeletingPromoCode}
            onClick={() => handleDeletePromoCode(promoCodeIdToEdit)}
          />
        )}
        {promoCodeIdToEdit && (
          <Button label={'Stop editing'} onClick={resetForm} />
        )}
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
  font-size: 24px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const NewPromoCodeNameInput = styled.div`
  flex: 3;
`;

const NewPromoCodeIndexInput = styled.div`
  flex: 1;
  display: flex;
  gap: 5px;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
