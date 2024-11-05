import { MessageCollection } from '../db/models/message.js';

class MessageService {

  async createMessage(chatId, senderId, text) {

    return MessageCollection.create({
      chatId, senderId, text
    });

  }

  async getMessages(chatId) {
    return MessageCollection.find({chatId});
  }

}

export default new MessageService();