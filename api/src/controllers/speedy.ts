import { Request, Response } from 'express';
import { SPEEDY_BASE_URL } from '../config';
import { translateText } from '../utils/translateText';

export const listOffices = async (req: Request, res: Response) => {
  const { username, password } = req.headers;

  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/office?userName=${username}&password=${password}&countryId=100`
  );
  const data = await response.json();
  res.json(data);
};

export const findCitiesByName = async (req: Request, res: Response) => {
  const { username, password, searchterm } = req.headers;

  try {
    const response = await fetch(
      `${SPEEDY_BASE_URL}/location/site?userName=${username}&password=${password}&countryId=100&name=${searchterm}`
    );
    const data = await response.json();
    console.log('data', data);
    const mappedCities = data.sites.map((city: any) => ({
      name: city.name,
      nameEn: city.nameEn
    }));
    res.json(mappedCities);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const findOfficesByCity = async (req: Request, res: Response) => {
  const { username, password, cityname } = req.headers;

  const cityName = translateText(cityname as string);

  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/office?userName=${username}&password=${password}&countryId=100&siteName=${cityName}`
  );
  const data = await response.json();
  const mappedOffices = data.offices.map((office: any) => ({
    name: office.name,
    city: office.address.siteName,
    address: office.address.localAddressString
  }));
  res.json(mappedOffices);
};
