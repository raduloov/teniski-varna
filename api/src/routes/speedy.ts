import { Router } from 'express';
import { listOffices } from '../controllers/speedy';

const router = Router();

router.get('/listOffices', listOffices);

export default router;
