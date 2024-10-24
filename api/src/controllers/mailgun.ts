import { Request, Response } from 'express';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { MAILGUN_API_KEY } from '../config';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: MAILGUN_API_KEY as string
});

const from = 'Teniski Varna <raduloov@gmail.com>';

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  try {
    if (!to || !subject || !text || !html) {
      res
        .status(400)
        .json({ message: 'Missing required fields: to, subject, text, html' });
    }

    const message = await mg.messages.create(
      'sandboxed7bf57a7b744946a5f41ff6425a0027.mailgun.org',
      { from, to, subject, text, html }
    );

    res.status(200).json({ message });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
