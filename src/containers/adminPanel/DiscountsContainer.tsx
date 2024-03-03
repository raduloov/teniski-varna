import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { icons } from '../../assets/icons';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from '@firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Label, useLabels } from '../../hooks/useLabels';
import { LabelsContainer } from '../../components/features/labels/LabelsContainer';
import { Discount, DiscountType, useDiscounts } from '../../hooks/useDiscounts';

export const DiscountsContainer = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  8;
  const [labels, setLabels] = useState<Label[]>([]);
  const [newDiscountName, setNewDiscountName] = useState<string>('');
  const [newDiscountPercentage, setNewDiscountPercentage] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<DiscountType>(
    DiscountType.GLOBAL
  );
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getDiscounts, isFetchingDiscounts } = useDiscounts();
  const { getLabels, isFetchingLabels } = useLabels();

  const setDiscountsFromFirebase = async () => {
    const fetchedDiscounts = await getDiscounts();
    setDiscounts(fetchedDiscounts);
  };

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    if (selectedOption === DiscountType.STANDARD) {
      setLabelsFromFirebase();
    }
  }, [selectedOption]);

  useEffect(() => {
    setDiscountsFromFirebase();
  }, []);

  const globalDiscounts = discounts.filter(
    (discount) => discount.type === DiscountType.GLOBAL
  );

  const standardDiscounts = discounts.filter(
    (discount) => discount.type === DiscountType.STANDARD
  );

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement> | DiscountType
  ) => {
    if (typeof event === 'string') {
      if (event === DiscountType.GLOBAL) {
        setSelectedOption(DiscountType.GLOBAL);
      }
      if (event === DiscountType.STANDARD) {
        setSelectedOption(DiscountType.STANDARD);
      }
    } else {
      setSelectedOption(event.target.value as DiscountType);
    }
  };

  const handleAddNewDiscount = async () => {
    if (newDiscountName === '') {
      return;
    }

    if (
      discounts.some(
        (discount) =>
          discount.name === newDiscountName && discount.type === selectedOption
      )
    ) {
      toast.error('Discount with that name already exists');
      return;
    }

    setIsLoading(true);

    const newDiscount = {
      name: newDiscountName,
      percentage: newDiscountPercentage,
      type: selectedOption,
      labelIds: selectedLabelIds,
      active: false
    };

    try {
      await addDoc(collection(db, 'discounts'), newDiscount);
      toast.success('🎉 Discount added successfully!');
      setDiscountsFromFirebase();
      resetForm();
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    }
  };

  const handleActivateDiscount = async (discount: Discount) => {
    setIsLoading(true);

    const updatedDiscount = {
      ...discount,
      active: !discount.active
    };

    try {
      await updateDoc(doc(db, 'discounts', discount.id), updatedDiscount);
      toast.success('🎉 Discount updated successfully!');
      setDiscounts((prevDiscounts) =>
        prevDiscounts.map((prevDiscount) =>
          prevDiscount.id === discount.id ? updatedDiscount : prevDiscount
        )
      );
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsLoading(false);
      return toast.error(`💥 ${e.message}`);
    }
  };

  const resetForm = () => {
    setNewDiscountName('');
    setNewDiscountPercentage(0);
    setSelectedLabelIds([]);
  };

  return (
    <Wrapper>
      <Text>Global discounts</Text>
      <DiscountsWrapper>
        {isFetchingDiscounts ? (
          <DiscountsLoadingContainer>
            <ActivityIndicator color={Color.BLACK} size={25} />
            <p>Fetching discounts...</p>
          </DiscountsLoadingContainer>
        ) : globalDiscounts.length > 0 ? (
          globalDiscounts.map((label) => (
            <DiscountWrapper key={label.id}>
              <DiscountText>{label.name}</DiscountText>
              <IconButtonsWrapper>
                <IconButton
                  icon={icons.FaEdit}
                  // onClick={() => handleStartEditingLabel(label)}
                />
                <IconButton
                  icon={icons.FaCheck}
                  containerColor={label.active ? Color.GREEN_CHECK : undefined}
                  iconColor={label.active ? Color.WHITE : undefined}
                  // onClick={() => handleStartEditingLabel(label)}
                />
              </IconButtonsWrapper>
            </DiscountWrapper>
          ))
        ) : (
          <p>No global discounts available</p>
        )}
      </DiscountsWrapper>

      <Text>Other discounts</Text>
      <DiscountsWrapper>
        {isFetchingDiscounts ? (
          <DiscountsLoadingContainer>
            <ActivityIndicator color={Color.BLACK} size={25} />
            <p>Fetching discounts...</p>
          </DiscountsLoadingContainer>
        ) : standardDiscounts.length > 0 ? (
          standardDiscounts.map((discount) => (
            <DiscountWrapper key={discount.id}>
              <DiscountText>{discount.name}</DiscountText>
              <IconButtonsWrapper>
                <PercentageWrapper>
                  <p>{discount.percentage}%</p>
                </PercentageWrapper>
                <IconButton
                  icon={icons.FaEdit}
                  // onClick={() => handleStartEditingLabel(label)}
                />
                <IconButton
                  icon={icons.FaCheck}
                  containerColor={
                    discount.active ? Color.GREEN_CHECK : undefined
                  }
                  iconColor={discount.active ? Color.WHITE : undefined}
                  onClick={() => handleActivateDiscount(discount)}
                />
              </IconButtonsWrapper>
            </DiscountWrapper>
          ))
        ) : (
          <p>No discounts available</p>
        )}
      </DiscountsWrapper>

      <Text>Add discount</Text>
      <InputContainer>
        <NewDiscountNameInput>
          <Input
            value={newDiscountName}
            placeholder={'Discount name...'}
            type={'text'}
            onChange={(e) => setNewDiscountName(e.target.value)}
          />
        </NewDiscountNameInput>
        <NewDiscountPercentageInput>
          <Input
            value={newDiscountPercentage}
            placeholder={'Percentage...'}
            type={'number'}
            min={0}
            onChange={(e) => {
              // TODO: Currently working but should be able to delete the initial 0, making it possible to write 1 instead of 01
              setNewDiscountPercentage(Number(e.target.value));
            }}
          />
        </NewDiscountPercentageInput>
        <Text>%</Text>
      </InputContainer>

      <RadioButtonsContainer>
        <RadioButtonContainer
          onClick={() => handleOptionChange(DiscountType.GLOBAL)}
        >
          <RadioButton
            type="radio"
            id="globalDiscount"
            value="globalDiscount"
            checked={selectedOption === DiscountType.GLOBAL}
            onChange={handleOptionChange}
          />
          <SmallText>Global discount</SmallText>
        </RadioButtonContainer>
        <RadioButtonContainer
          onClick={() => handleOptionChange(DiscountType.STANDARD)}
        >
          <RadioButton
            type="radio"
            id="standardDiscount"
            value="standardDiscount"
            checked={selectedOption === DiscountType.STANDARD}
            onChange={handleOptionChange}
          />
          <SmallText>Standard discount</SmallText>
        </RadioButtonContainer>
      </RadioButtonsContainer>

      {selectedOption === DiscountType.STANDARD && (
        <LabelsWrapper>
          <SmallText>Choose labels</SmallText>
          <LabelsContainer
            labels={labels}
            isFetchingLabels={isFetchingLabels}
            selective={true}
            selectedLabelIds={selectedLabelIds}
            handleSelectLabel={(labelId) => {
              if (selectedLabelIds.includes(labelId)) {
                setSelectedLabelIds((prev) =>
                  prev.filter((id) => id !== labelId)
                );
              } else {
                setSelectedLabelIds((prev) => [...prev, labelId]);
              }
            }}
          />
        </LabelsWrapper>
      )}

      <ButtonContainer>
        <Button
          label={'Add new discount'}
          disabled={newDiscountName === ''}
          loading={isLoading}
          onClick={handleAddNewDiscount}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

const RadioButton = styled.input`
  /* margin-right: 5px; */
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const LabelsWrapper = styled.div`
  margin-top: 10px;
`;

const DiscountsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgb(247, 247, 247, 0.5);
  border-radius: 5px;
  margin: 10px 0 10px 0;
  flex-wrap: wrap;
`;

const DiscountText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  color: ${Color.WHITE};
`;

const DiscountsLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Color.ACCENT};
  padding: 5px 15px 5px 5px;
  border: 2px dotted ${Color.WHITE};
  border-radius: 10px;
  margin: 5px 10px;
`;

const IconButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const PercentageWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  border-style: dashed;
  border-width: 1px;
  border-color: ${Color.GRAY};
  background-color: ${Color.WHITE};
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.1));
  p {
    color: ${Color.GRAY};
  }
`;

const Text = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const SmallText = styled.p`
  font-size: 16px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const NewDiscountNameInput = styled.div`
  flex: 3;
`;

const NewDiscountPercentageInput = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
