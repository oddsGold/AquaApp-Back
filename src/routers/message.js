import { Router } from 'express';
import MessageController from '../controllers/message-controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const messageRouter = new Router();

messageRouter.post('/', authenticate, ctrlWrapper(MessageController.createMessage));
messageRouter.get('/:chatId', authenticate, ctrlWrapper(MessageController.getMessages));

export default messageRouter;