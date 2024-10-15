import { Request, Response } from 'express';
import { SPEEDY_BASE_URL } from '../config';

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

  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/site?userName=${username}&password=${password}&countryId=100&name=${searchterm}`
  );
  const data = await response.json();
  const mappedCities = data.sites.map((city: any) => ({
    name: city.name,
    nameEn: city.nameEn
  }));
  res.json(mappedCities);
};

export const findOfficesByCity = async (req: Request, res: Response) => {
  const { username, password, cityname } = req.headers;

  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/office/nearest-offices?userName=${username}&password=${password}&countryId=100&siteName=${cityname}`
  );
  const data = await response.json();
  const mappedOffices = data.offices.map((office: any) => ({
    name: office.name,
    address: office.address.localAddressString
  }));
  res.json(mappedOffices);
};
