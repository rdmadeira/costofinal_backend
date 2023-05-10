import { Router } from 'express';
import { mailingGetHandler } from '../handlers/mailingHandlers.js';

const router = Router();

router.get('/', mailingGetHandler);

export default router;
