import dotenv from 'dotenv';

dotenv.config();

export const SPEEDY_BASE_URL = 'https://api.speedy.bg/v1';

export const API_PORT_DEV = process.env.API_PORT_DEV;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
