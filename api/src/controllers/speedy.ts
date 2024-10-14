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
