import React, { useCallback, useEffect, useState } from 'react';
import { SpeedyCity, SpeedyOffice, useSpeedy } from '../../../hooks/useSpeedy';
import styled from 'styled-components';
import { Input } from '../../common/Input';
import { translateTextForSpeedyQuery } from '../../../utils/translateText';
import { AsyncPaginate } from 'react-select-async-paginate';
import Select from 'react-select';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Color } from '../../../assets/constants';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [speedyOffices, setSpeedyOffices] = useState<SpeedyOffice[]>([]);

  const { findCitiesByName, findOfficesByCity, isLoading } = useSpeedy();

  const loadCities = useCallback(async () => {
    const cities = await findCitiesByName(
      translateTextForSpeedyQuery(searchTerm)
    );

    return {
      options: cities ?? []
    };
  }, [searchTerm]);

  const loadOffices = useCallback(async (city: string) => {
    const offices = await findOfficesByCity(city.toLowerCase());
    setSpeedyOffices(offices);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      loadOffices(selectedCity.nameEn);
    } else {
      setSpeedyOffices([]);
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
          />
        </InputWrapper>
      )}
      {selectedDeliveryOption === DeliveryOption.SPEEDY_OFFICE && (
        <>
          <AsyncPaginate
            loadOptions={loadCities}
            getOptionLabel={(option: SpeedyCity) => option.name}
            getOptionValue={(option: SpeedyCity) => option.name}
            placeholder={'Населено място'}
            loadingMessage={() => 'Търсим населено място...'}
            noOptionsMessage={() => 'Няма намерени резултати'}
            onInputChange={(value) => setSearchTerm(value.toLowerCase())}
            onChange={(value) => setSelectedCity(value)}
            debounceTimeout={500}
          />
          {isLoading && selectedCity && (
            <ActivityIndicatorWrapper>
              <ActivityIndicator size={45} color={Color.ACCENT} />
              <p>Търсим офиси около вас...</p>
            </ActivityIndicatorWrapper>
          )}
          {!isLoading && selectedCity && (
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
