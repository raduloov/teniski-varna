import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { icons } from '../../assets/icons';
import { addDoc, collection, deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Label, useLabels } from '../../hooks/useLabels';
import { LabelsContainer } from '../../components/features/labels/LabelsContainer';

type DiscountType = 'globalDiscount' | 'standardDiscount';

export const DiscountsContainer = () => {
  const [globalDiscounts, setGlobalDiscounts] = useState<Label[]>([]);
  8;
  const [labels, setLabels] = useState<Label[]>([]);
  const [newLabelName, setNewLabelName] = useState<string>('');
  const [newLabelIndex, setNewLabelIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] =
    useState<DiscountType>('globalDiscount');
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getLabels, isFetchingLabels } = useLabels();

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    if (selectedOption === 'standardDiscount') {
      setLabelsFromFirebase();
    }
  }, [selectedOption]);

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement> | DiscountType
  ) => {
    if (typeof event === 'string') {
      if (event === 'globalDiscount') {
        setSelectedOption('globalDiscount');
      }
      if (event === 'standardDiscount') {
        setSelectedOption('standardDiscount');
      }
    } else {
      setSelectedOption(event.target.value as DiscountType);
    }
  };

  return (
    <Wrapper>
      <Text>Global discounts</Text>
      <DiscountsWrapper>
        {isFetchingLabels ? (
          <DiscountsLoadingContainer>
            <ActivityIndicator color={Color.BLACK} size={25} />
            <p>Fetching discounts...</p>
          </DiscountsLoadingContainer>
        ) : globalDiscounts.length > 0 ? (
          globalDiscounts.map((label) => (
            <DiscountWrapper key={label.id}>
              <DiscountText>{label.name}</DiscountText>
              <IconButton
                icon={icons.FaEdit}
                // onClick={() => handleStartEditingLabel(label)}
              />
            </DiscountWrapper>
          ))
        ) : (
          <p>No global discounts available</p>
        )}
      </DiscountsWrapper>

      <Text>Other discounts</Text>
      <DiscountsWrapper>
        {isFetchingLabels ? (
          <DiscountsLoadingContainer>
            <ActivityIndicator color={Color.BLACK} size={25} />
            <p>Fetching discounts...</p>
          </DiscountsLoadingContainer>
        ) : globalDiscounts.length > 0 ? (
          globalDiscounts.map((label) => (
            <DiscountWrapper key={label.id}>
              <DiscountText>{label.name}</DiscountText>
              <IconButton
                icon={icons.FaEdit}
                // onClick={() => handleStartEditingLabel(label)}
              />
            </DiscountWrapper>
          ))
        ) : (
          <p>No discounts available</p>
        )}
      </DiscountsWrapper>

      <Text>Add discount</Text>
      <InputContainer>
        <NewLabelNameInput>
          <Input
            value={newLabelName}
            placeholder={'Discount name...'}
            type={'text'}
            onChange={(e) => setNewLabelName(e.target.value)}
          />
        </NewLabelNameInput>
        <NewLabelIndexInput>
          <Input
            value={newLabelIndex}
            placeholder={'Index...'}
            type={'number'}
            min={0}
            onChange={(e) => {
              // TODO: Currently working but should be able to delete the initial 0, making it possible to write 1 instead of 01
              setNewLabelIndex(Number(e.target.value));
            }}
          />
        </NewLabelIndexInput>
        <Text>%</Text>
      </InputContainer>

      <RadioButtonsContainer>
        <RadioButtonContainer
          onClick={() => handleOptionChange('globalDiscount')}
        >
          <RadioButton
            type="radio"
            id="globalDiscount"
            value="globalDiscount"
            checked={selectedOption === 'globalDiscount'}
            onChange={handleOptionChange}
          />
          <SmallText>Global discount</SmallText>
        </RadioButtonContainer>
        <RadioButtonContainer
          onClick={() => handleOptionChange('standardDiscount')}
        >
          <RadioButton
            type="radio"
            id="standardDiscount"
            value="standardDiscount"
            checked={selectedOption === 'standardDiscount'}
            onChange={handleOptionChange}
          />
          <SmallText>Standard discount</SmallText>
        </RadioButtonContainer>
      </RadioButtonsContainer>

      {selectedOption === 'standardDiscount' && (
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
          disabled={newLabelName === ''}
          loading={isLoading}
          // onClick={handleActionButtonFunction}
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

const NewLabelNameInput = styled.div`
  flex: 3;
`;

const NewLabelIndexInput = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
