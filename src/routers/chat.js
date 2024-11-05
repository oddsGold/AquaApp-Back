import { Router } from 'express';
import ChatController from '../controllers/chat-controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const chatRouter = new Router();

chatRouter.post('/', authenticate, ctrlWrapper(ChatController.createChat));
chatRouter.get('/:userId', authenticate, ctrlWrapper(ChatController.findUserChats));
chatRouter.get('/find/:firstId/:secondId', authenticate, ctrlWrapper(ChatController.findChat));

export default chatRouter;