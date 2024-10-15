import React, { useEffect, useState } from 'react';
import { SpeedyCity, SpeedyOffice, useSpeedy } from '../../hooks/useSpeedy';
import styled from 'styled-components';
import { Input } from '../../components/common/Input';
import { CheckoutField, saveCustomerDataToLocalStorage } from './utils';
import { translateText } from '../../utils/translateText';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { Color } from '../../assets/constants';

export enum DeliveryOption {
  PERSONAL_ADDRESS = 'personalAddress',
  SPEEDY_OFFICE = 'speedyOffice'
}

interface Props {
  selectedDeliveryOption: string;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  setSelectedSpeedyOffice: (office: SpeedyOffice | null) => void;
  selectedCity: SpeedyCity | null;
  setSelectedCity: (city: SpeedyCity | null) => void;
}

export const SpeedyOfficeSelector = ({
  selectedDeliveryOption,
  customerAddress,
  setCustomerAddress,
  setSelectedSpeedyOffice,
  selectedCity,
  setSelectedCity
}: Props) => {
  const [speedyOffices, setSpeedyOffices] = useState<SpeedyOffice[]>([]);
  const [searhTerm, setSearchTerm] = useState<string>('');

  const { findCitiesByName, findOfficesByCity, isLoading } = useSpeedy();

  const loadCities = async () =>
    await findCitiesByName(translateText(searhTerm));

  const loadOffices = async (city: string) => {
    const offices = await findOfficesByCity(city.toLowerCase());
    setSpeedyOffices(offices);
  };

  useEffect(() => {
    if (selectedCity) {
      loadOffices(selectedCity.nameEn);
    }
  }, [selectedCity]);

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
            loadOptions={loadCities}
            getOptionLabel={(option: SpeedyCity) => option.name}
            getOptionValue={(option: SpeedyCity) => option.name}
            placeholder={'Населено място'}
            loadingMessage={() => 'Търсим населено място...'}
            noOptionsMessage={() => 'Няма намерени резултати'}
            onInputChange={(value) => setSearchTerm(value)}
            onChange={(value) => setSelectedCity(value)}
          />
          {isLoading ? (
            <ActivityIndicatorWrapper>
              <ActivityIndicator size={45} color={Color.ACCENT} />
              <p>Търсим офиси около вас...</p>
            </ActivityIndicatorWrapper>
          ) : (
            <Select
              options={speedyOffices}
              getOptionLabel={(option: SpeedyOffice) => option.address}
              getOptionValue={(option: SpeedyOffice) => option.address}
              placeholder={'Офис'}
              loadingMessage={() => 'Търсим офис...'}
              noOptionsMessage={() => 'Няма намерени резултати'}
              onChange={(value) => setSelectedSpeedyOffice(value)}
            />
          )}
        </>
      )}
    </>
  );
};

const ActivityIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
