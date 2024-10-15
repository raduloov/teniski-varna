import React, { useState } from 'react';
import { useSpeedy } from '../../hooks/useSpeedy';
import styled from 'styled-components';
import { Input } from '../../components/common/Input';
import { CheckoutField, saveCustomerDataToLocalStorage } from './utils';
import { translateText } from '../../utils/translateText';
import AsyncSelect from 'react-select/async';

export enum DeliveryOption {
  PERSONAL_ADDRESS = 'personalAddress',
  SPEEDY_OFFICE = 'speedyOffice'
}

interface Props {
  selectedDeliveryOption: string;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  customerSpeedyOffice: string;
  setCustomerSpeedyOffice: (speedyOffice: string) => void;
}

export const SpeedyOfficeSelector = ({
  selectedDeliveryOption,
  customerAddress,
  setCustomerAddress,
  customerSpeedyOffice,
  setCustomerSpeedyOffice
}: Props) => {
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>({});
  const [speedyOffices, setSpeedyOffices] = useState<any[]>([]);
  const [selectedSpeedyOffice, setSelectedSpeedyOffice] = useState<string>();
  const [searhTerm, setSearchTerm] = useState<string>('');

  const { findCitiesByName, listOfficesByCity, isLoading } = useSpeedy();

  const loadOptions = async () =>
    await findCitiesByName(translateText(searhTerm));

  return (
    <>
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
        <>
          <AsyncSelect
            loadOptions={loadOptions}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.name}
            placeholder={'Населено място'}
            loadingMessage={() => 'Търсим населено място...'}
            noOptionsMessage={() => 'Няма намерени резултати'}
            onInputChange={(value) => setSearchTerm(value)}
            onChange={(value) => setSelectedCity(value)}
          />
        </>
      )}
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
