import { Router } from 'express';
import { myPosNotify } from '../controllers/myPos';

const router = Router();

router.post('/notify', myPosNotify);

export default router;
