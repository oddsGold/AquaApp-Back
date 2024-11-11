import { Router } from 'express';
import usersRouter from './users.js';
import waterRouter from './water.js';
import chatRouter from './chat.js';
import messageRouter from './message.js';
import authRouter from './auth.js';

const router = Router();

router.use('/', usersRouter);
router.use('/', authRouter);
router.use('/water', waterRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);

export default router;
