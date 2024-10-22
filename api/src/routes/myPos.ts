import { Router } from 'express';
import { myPosNotify } from '../controllers/myPos';

const router = Router();

router.get('/notify', myPosNotify);

export default router;
