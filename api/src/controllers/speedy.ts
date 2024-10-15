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
  res.json(data);
};

export const listOfficesByCity = async (req: Request, res: Response) => {
  const { username, password, cityname } = req.headers;

  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/office/nearest-offices?userName=${username}&password=${password}&countryId=100&siteName=${cityname}`
  );
  const data = await response.json();
  res.json(data);
};
