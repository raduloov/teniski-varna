import { Router } from 'express';
import {
  listCities,
  listOffices,
  listOfficesByCity
} from '../controllers/speedy';

const router = Router();

router.get('/listOffices', listOffices);
router.get('/listCities', listCities);
router.get('/listOfficesByCity', listOfficesByCity);

export default router;
