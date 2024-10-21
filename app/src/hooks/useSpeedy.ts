import { useState } from 'react';
import { toast } from 'react-toastify';

const {
  REACT_APP_TENISKI_API_BASE_URL,
  REACT_APP_SPEEDY_USERNAME,
  REACT_APP_SPEEDY_PASSWORD
} = process.env;

export interface SpeedyCity {
  name: string;
  nameEn: string;
}

export interface SpeedyOffice {
  name: string;
  city: string;
  address: string;
}

export const useSpeedy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const listOffices = async () => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/speedy/listOffices`;

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        headers: {
          username: REACT_APP_SPEEDY_USERNAME ?? '',
          password: REACT_APP_SPEEDY_PASSWORD ?? ''
        }
      });
      const data = await response.json();
      return data;
    } catch (e: unknown) {
      toast.error(`💥 ${(e as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const findCitiesByName = async (searchTerm: string) => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/speedy/findCitiesByName`;

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        headers: {
          username: REACT_APP_SPEEDY_USERNAME ?? '',
          password: REACT_APP_SPEEDY_PASSWORD ?? '',
          searchterm: searchTerm
        }
      });
      const data = await response.json();
      return data;
    } catch (e: unknown) {
      toast.error(`💥 ${(e as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const findOfficesByCity = async (cityName: string) => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/speedy/findOfficesByCity`;

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        headers: {
          username: REACT_APP_SPEEDY_USERNAME ?? '',
          password: REACT_APP_SPEEDY_PASSWORD ?? '',
          cityname: cityName
        }
      });
      const data = await response.json();

      return data;
    } catch (e: unknown) {
      toast.error(`💥 ${(e as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { listOffices, findCitiesByName, findOfficesByCity, isLoading };
};
