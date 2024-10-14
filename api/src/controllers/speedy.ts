import { Request, Response } from 'express';
import { SPEEDY_BASE_URL } from '../config';

const { SPEEDY_USERNAME, SPEEDY_PASSWORD } = process.env;

export const listOffices = async (req: Request, res: Response) => {
  const response = await fetch(
    `${SPEEDY_BASE_URL}/location/office?userName=${SPEEDY_USERNAME}&password=${SPEEDY_PASSWORD}&countryId=100`
  );
  const data = await response.json();
  res.json(data);
};
