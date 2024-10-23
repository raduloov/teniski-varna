import React, { useCallback, useEffect, useState } from 'react';
import { SpeedyCity, SpeedyOffice, useSpeedy } from '../../../hooks/useSpeedy';
import styled from 'styled-components';
import { Input } from '../../common/Input';
import { translateTextForSpeedyQuery } from '../../../utils/translateText';
import { AsyncPaginate } from 'react-select-async-paginate';
import Select, { PropsValue } from 'react-select';
import { ActivityIndicator } from '../../common/ActivityIndicator';
import { Color } from '../../../assets/constants';

export enum DeliveryOption {
  PERSONAL_ADDRESS = 'personalAddress',
  SPEEDY_OFFICE = 'speedyOffice'
}

interface Props {
  selectedDeliveryOption: string;
  customerCity: string;
  setCustomerCity: (city: string) => void;
  customerStreet: string;
  setCustomerStreet: (address: string) => void;
  customerAdditionalNotes: string;
  setCustomerAdditionalNotes: (notes: string) => void;
  setSelectedSpeedyOffice: (office: SpeedyOffice | null) => void;
  selectedCity: SpeedyCity | null;
  setSelectedCity: (city: SpeedyCity | null) => void;
}

export const DeliveryInfoSelector = ({
  selectedDeliveryOption,
  customerCity,
  setCustomerCity,
  customerStreet,
  setCustomerStreet,
  customerAdditionalNotes,
  setCustomerAdditionalNotes,
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

  const inputStyle = `
    background: white;
    border: 1px solid rgb(209, 209, 209);
    border-radius: 2px;
    padding: 10px 0;
  `;

  const value = customerCity
    ? ({ name: customerCity } as PropsValue<SpeedyCity>)
    : undefined;

  return (
    <>
      {selectedDeliveryOption === DeliveryOption.PERSONAL_ADDRESS && (
        <InputWrapper>
          <Text>Населено място</Text>
          <AsyncPaginate
            value={value}
            loadOptions={loadCities}
            getOptionLabel={(option: SpeedyCity) => option.name}
            getOptionValue={(option: SpeedyCity) => option.name}
            placeholder={'Населено място'}
            loadingMessage={() => 'Търсим населено място...'}
            noOptionsMessage={() => 'Няма намерени резултати'}
            onInputChange={(value) => setSearchTerm(value.toLowerCase())}
            onChange={(value) => setCustomerCity(value?.name ?? '')}
            debounceTimeout={500}
          />
          {customerCity && (
            <>
              <Text>Улица</Text>
              <Input
                value={customerStreet}
                placeholder={'улица, номер'}
                onChange={(e) => setCustomerStreet(e.target.value)}
                additionalStyles={inputStyle}
              />
              <Text>Допълнителни пояснения</Text>
              <Input
                value={customerAdditionalNotes}
                placeholder={'етаж, вход, апартамент, град, пощенски код'}
                onChange={(e) => setCustomerAdditionalNotes(e.target.value)}
                additionalStyles={inputStyle}
              />
            </>
          )}
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

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
  color: ${Color.DARK_GRAY};
`;

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
