import {ChatCollection} from '../db/models/chat.js';

class ChatService {

  async createChat(firstId, secondId) {
    const chat = await ChatCollection.findOne({
      members: { $all: [firstId, secondId] }
    });

    if (chat) {
      return chat
    }

    const newChat = new ChatCollection({
      members: [firstId, secondId]
    });

    return await newChat.save();
  }

  async findChats(userId) {
    return ChatCollection.find({
      members: { $in: [userId] }
    });
  }

  async findChat(firstId, secondId) {
    return ChatCollection.find({
      members: { $all: [firstId, secondId] }
    }).sort({ createdAt: -1 });
  }

}

export default new ChatService();