import { Router } from 'express';
import { sendEmail } from '../controllers/mailgun';

const router = Router();

router.post('/sendEmail', sendEmail);

export default router;
