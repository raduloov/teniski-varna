import { Router } from 'express';
import {
  listOffices,
  findCitiesByName,
  listOfficesByCity
} from '../controllers/speedy';

const router = Router();

router.get('/listOffices', listOffices);
router.get('/findCitiesByName', findCitiesByName);
router.get('/listOfficesByCity', listOfficesByCity);

export default router;
