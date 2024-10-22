import { Request, Response } from 'express';

export const myPosNotify = async (req: Request, res: Response) => {
  res.status(200).send('OK');
};
