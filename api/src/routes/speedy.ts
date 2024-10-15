import { Router } from 'express';
import {
  listOffices,
  findCitiesByName,
  findOfficesByCity
} from '../controllers/speedy';

const router = Router();

router.get('/listOffices', listOffices);
router.get('/findCitiesByName', findCitiesByName);
router.get('/findOfficesByCity', findOfficesByCity);

export default router;
