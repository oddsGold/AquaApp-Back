import MessageService from '../services/message.js';
import createHttpError from 'http-errors';

class MessageController {

  async createMessage(req, res) {
    const {chatId, senderId, textMessage} = req.body;

    const message = await MessageService.createMessage(chatId, senderId, textMessage);

    res.json({
      status: 200,
      message: 'Message created!',
      data: {
        message
      },
    });
  }

  async getMessages(req, res) {
    const {chatId} = req.params;

    const messages = await MessageService.getMessages(chatId);

    if (!messages) {
      throw createHttpError(401, 'Messages not found');
    }

    res.json({
      status: 200,
      message: 'Messages found',
      data: {
        messages
      },
    });
  }
}

export default new MessageController();