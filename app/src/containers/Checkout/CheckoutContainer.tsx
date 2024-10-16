import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/common/Input';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';
import { Button } from '../../components/common/Button';
import {
  CheckoutField,
  getCustomerDataFromLocalStorage,
  saveCustomerDataToLocalStorage
} from './utils';
import { DeliveryOption, SpeedyOfficeSelector } from './SpeedyOfficeSelector';
import { SpeedyCity, SpeedyOffice } from '../../hooks/useSpeedy';

const MemoizedInput = React.memo(Input);
const MemoizedButton = React.memo(Button);
const MemoizedSpeedyOfficeSelector = React.memo(SpeedyOfficeSelector);

interface Props {
  onGoBack: () => void;
  onContinueToMyPos: () => void;
}

export const CheckoutContainer = ({ onGoBack, onContinueToMyPos }: Props) => {
  const { firstName, lastName, phone, email, address, deliveryOption } =
    getCustomerDataFromLocalStorage();

  const [customerFirstName, setCustomerFirstName] = useState<string>(
    firstName ?? ''
  );
  const [customerLastName, setCustomerLastName] = useState<string>(
    lastName ?? ''
  );
  const [customerPhone, setCustomerPhone] = useState<string>(phone ?? '');
  const [customerEmail, setCustomerEmail] = useState<string>(email ?? '');
  const [customerAddress, setCustomerAddress] = useState<string>(address ?? '');
  const [selectedCity, setSelectedCity] = useState<SpeedyCity | null>(null);
  const [selectedSpeedyOffice, setSelectedSpeedyOffice] =
    useState<SpeedyOffice | null>(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<DeliveryOption>(deliveryOption ?? DeliveryOption.PERSONAL_ADDRESS);

  const handleOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | DeliveryOption) => {
      if (typeof event === 'string') {
        if (event === DeliveryOption.PERSONAL_ADDRESS) {
          setSelectedDeliveryOption(DeliveryOption.PERSONAL_ADDRESS);
          saveCustomerDataToLocalStorage(
            CheckoutField.DELIVERY_OPTION,
            DeliveryOption.PERSONAL_ADDRESS
          );
        }
        if (event === DeliveryOption.SPEEDY_OFFICE) {
          setSelectedDeliveryOption(DeliveryOption.SPEEDY_OFFICE);
          saveCustomerDataToLocalStorage(
            CheckoutField.DELIVERY_OPTION,
            DeliveryOption.SPEEDY_OFFICE
          );
        }
      } else {
        setSelectedDeliveryOption(event.target.value as DeliveryOption);
      }
    },
    []
  );

  const isAllDataAvailable = useMemo(
    () =>
      customerFirstName &&
      customerLastName &&
      customerPhone &&
      customerEmail &&
      (selectedDeliveryOption === DeliveryOption.PERSONAL_ADDRESS
        ? customerAddress
        : selectedSpeedyOffice),
    [
      customerFirstName,
      customerLastName,
      customerPhone,
      customerEmail,
      customerAddress,
      selectedDeliveryOption,
      selectedSpeedyOffice
    ]
  );

  return (
    <Wrapper>
      <BackButton onClick={onGoBack}>
        <icons.FaChevronLeft />
        <p>Обратно към Обобщение</p>
      </BackButton>
      <LargeText>Лични данни</LargeText>
      <InputWrapper>
        <Text>Име</Text>
        <MemoizedInput
          value={customerFirstName}
          placeholder={'Име'}
          onChange={(e) => setCustomerFirstName(e.target.value)}
          onBlur={() =>
            saveCustomerDataToLocalStorage(
              CheckoutField.CUSTOMER_FIRST_NAME,
              customerFirstName
            )
          }
        />
      </InputWrapper>
      <InputWrapper>
        <Text>Фамилия</Text>
        <MemoizedInput
          value={customerLastName}
          placeholder={'Фамилия'}
          onChange={(e) => setCustomerLastName(e.target.value)}
          onBlur={() =>
            saveCustomerDataToLocalStorage(
              CheckoutField.CUSTOMER_LAST_NAME,
              customerLastName
            )
          }
        />
      </InputWrapper>
      <InputWrapper>
        <Text>Телефон</Text>
        <Input
          value={customerPhone}
          placeholder={'08XXXXXXXX'}
          type={'number'}
          onChange={(e) => setCustomerPhone(e.target.value)}
          onBlur={() =>
            saveCustomerDataToLocalStorage(
              CheckoutField.CUSTOMER_PHONE,
              customerPhone
            )
          }
        />
      </InputWrapper>
      <InputWrapper>
        <Text>Имейл</Text>
        <MemoizedInput
          value={customerEmail}
          placeholder={'name@email.com'}
          onChange={(e) => setCustomerEmail(e.target.value)}
          onBlur={() =>
            saveCustomerDataToLocalStorage(
              CheckoutField.CUSTOMER_EMAIL,
              customerEmail
            )
          }
        />
      </InputWrapper>
      <Divider />
      <LargeText>Доставка</LargeText>
      <RadioButtonsWrapper>
        <RadioOption
          onClick={() => handleOptionChange(DeliveryOption.PERSONAL_ADDRESS)}
        >
          <RadioButton
            type="radio"
            id={DeliveryOption.PERSONAL_ADDRESS}
            value={DeliveryOption.PERSONAL_ADDRESS}
            checked={selectedDeliveryOption === DeliveryOption.PERSONAL_ADDRESS}
            onChange={(e) => handleOptionChange(e)}
          />
          <Text>Личен адрес</Text>
        </RadioOption>
        <RadioOption
          onClick={() => handleOptionChange(DeliveryOption.SPEEDY_OFFICE)}
        >
          <RadioButton
            type="radio"
            id={DeliveryOption.SPEEDY_OFFICE}
            value={DeliveryOption.SPEEDY_OFFICE}
            checked={selectedDeliveryOption === DeliveryOption.SPEEDY_OFFICE}
            onChange={(e) => handleOptionChange(e)}
          />
          <Text>Офис на Спиди</Text>
        </RadioOption>
      </RadioButtonsWrapper>
      <MemoizedSpeedyOfficeSelector
        selectedDeliveryOption={selectedDeliveryOption}
        customerAddress={customerAddress}
        setCustomerAddress={setCustomerAddress}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setSelectedSpeedyOffice={setSelectedSpeedyOffice}
      />
      <Divider />
      <MemoizedButton
        label={'Продължи към плащане'}
        disabled={!isAllDataAvailable}
        onClick={onContinueToMyPos}
      />
    </Wrapper>
  );
};

const BackButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${Color.DARK_GRAY};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RadioButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioButton = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
`;

const LargeText = styled.p`
  font-size: 24px;
  font-weight: 500;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: ${Color.DARK_GRAY};
`;
