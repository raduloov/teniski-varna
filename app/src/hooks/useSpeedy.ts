import { useState } from 'react';
import { toast } from 'react-toastify';

const {
  REACT_APP_TENISKI_API_BASE_URL,
  REACT_APP_SPEEDY_USERNAME,
  REACT_APP_SPEEDY_PASSWORD
} = process.env;

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
    } catch (e) {
      toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const findCitiesByName = async () => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/speedy/listCities`;

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        headers: {
          username: REACT_APP_SPEEDY_USERNAME ?? '',
          password: REACT_APP_SPEEDY_PASSWORD ?? ''
        }
      });
      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (e) {
      toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const listOfficesByCity = async (cityName: string) => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/speedy/listOfficesByCity`;

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
    } catch (e) {
      toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { listOffices, findCitiesByName, listOfficesByCity, isLoading };
};
