import React, { useState } from 'react';
import styled from 'styled-components';
import { PromoCode, usePromoCodes } from '../../hooks/usePromoCodes';
import { Input } from '../../components/common/Input';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Button } from '../../components/common/Button';
import {
  CheckoutField,
  getCustomerDataFromLocalStorage,
  saveCustomerDataToLocalStorage
} from './utils';

enum DeliveryOption {
  PERSONAL_ADDRESS = 'personalAddress',
  SPEEDY_OFFICE = 'speedyOffice'
}

interface Props {
  onGoToCheckout: () => void;
  onApplyPromoCode: (promoCode: PromoCode | null) => void;
}

export const CheckoutContainer = ({
  onGoToCheckout,
  onApplyPromoCode
}: Props) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    speedyOffice,
    deliveryOption
  } = getCustomerDataFromLocalStorage();

  const [customerFirstName, setCustomerFirstName] = useState<string>(
    firstName ?? ''
  );
  const [customerLastName, setCustomerLastName] = useState<string>(
    lastName ?? ''
  );
  const [customerPhone, setCustomerPhone] = useState<string>(phone ?? '');
  const [customerEmail, setCustomerEmail] = useState<string>(email ?? '');
  const [customerAddress, setCustomerAddress] = useState<string>(address ?? '');
  const [customerSpeedyOffice, setCustomerSpeedyOffice] = useState<string>(
    speedyOffice ?? ''
  );
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<DeliveryOption>(deliveryOption ?? DeliveryOption.PERSONAL_ADDRESS);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean | null>(
    null
  );
  const { checkPromoCode, isLoading: isCheckingPromoCode } = usePromoCodes();

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement> | DeliveryOption
  ) => {
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
  };

  const checkPromoCodeValidity = async () => {
    const code = await checkPromoCode(promoCode);
    setIsPromoCodeValid(!!code);
    onApplyPromoCode(code ?? null);
  };

  const isAllDataAvailable =
    customerFirstName &&
    customerLastName &&
    customerPhone &&
    customerEmail &&
    (selectedDeliveryOption === DeliveryOption.PERSONAL_ADDRESS
      ? customerAddress
      : customerSpeedyOffice);

  return (
    <Wrapper>
      <LargeText>Лични данни</LargeText>
      <InputWrapper>
        <Text>Име</Text>
        <Input
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
        <Input
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
          placeholder={'08XX XXX XXX'}
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
        <Input
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
      {selectedDeliveryOption === DeliveryOption.PERSONAL_ADDRESS && (
        <InputWrapper>
          <Input
            value={customerAddress}
            placeholder={
              'улица, номер, етаж, вход, апартамент, град, пощенски код'
            }
            onChange={(e) => setCustomerAddress(e.target.value)}
            onBlur={() =>
              saveCustomerDataToLocalStorage(
                CheckoutField.CUSTOMER_ADDRESS,
                customerAddress
              )
            }
          />
        </InputWrapper>
      )}
      {selectedDeliveryOption === DeliveryOption.SPEEDY_OFFICE && (
        <InputWrapper>
          <Input
            value={customerSpeedyOffice}
            placeholder={'Офис на Спиди'}
            onChange={(e) => setCustomerSpeedyOffice(e.target.value)}
            onBlur={() =>
              saveCustomerDataToLocalStorage(
                CheckoutField.CUSTOMER_SPEEDY_OFFICE,
                customerSpeedyOffice
              )
            }
          />
        </InputWrapper>
      )}
      <Divider />
      <LargeText>Промо код</LargeText>
      <InputWrapper>
        <Input
          value={promoCode}
          placeholder={'Промо код'}
          onChange={(e) => setPromoCode(e.target.value)}
          onEnterKey={checkPromoCodeValidity}
        />
        <PromoCodeButton
          isValid={isPromoCodeValid}
          isLoading={isCheckingPromoCode}
          onClick={checkPromoCodeValidity}
        >
          {isCheckingPromoCode && (
            <ActivityIndicator size={20} color={Color.DARK_GRAY} />
          )}
          {isPromoCodeValid === null && !isCheckingPromoCode && (
            <Text>Потвърди промо код</Text>
          )}
          {isPromoCodeValid === false && !isCheckingPromoCode && (
            <>
              <Text>Промо кодът не е валиден</Text>
              <icons.FaTimes size={20} color={Color.WHITE} />
            </>
          )}
          {isPromoCodeValid === true && !isCheckingPromoCode && (
            <>
              <Text>Промо кодът е добавен</Text>
              <icons.FaCheck size={20} color={Color.WHITE} />
            </>
          )}
        </PromoCodeButton>
      </InputWrapper>
      <Divider />
      <Button
        label={'Продължи към плащане'}
        disabled={!isAllDataAvailable}
        onClick={onGoToCheckout}
      />
    </Wrapper>
  );
};

const PromoCodeButton = styled.div<{
  isValid: boolean | null;
  isLoading: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  gap: 5px;
  padding: 0.3rem;
  background-color: ${({ isValid, isLoading }) => {
    if (isLoading) return Color.LIGHT_GRAY;
    if (isValid === null) return Color.LIGHT_GRAY;
    if (isValid === true) return Color.GREEN_CHECK;
    if (isValid === false) return Color.LIGHT_RED;
  }};
  color: ${({ isValid }) => (isValid === null ? Color.DARK_GRAY : 'white')};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
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
