import { Request, Response } from 'express';

export const myPosNotify = async (req: Request, res: Response) => {
  console.log('request:', req);
  console.log('body:', req.body);
  res.status(200).send('OK');
};
