import ChatService from '../services/chat.js'
import createHttpError from "http-errors";

class ChatController {

  async createChat(req, res) {
    const {firstId, secondId} = req.body;

    const chat = await ChatService.createChat(firstId, secondId);

    res.status(200).json({
      status: 200,
      message: `Successfully find or create chat!`,
      data: {
        chat
      },
    });
  }

  async findUserChats(req, res) {
    const userId = req.params.userId;

    const chats = await ChatService.findChats(userId);

    if (!chats) {
      throw createHttpError(401, 'Chats not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found chats!`,
      data: {
        chats
      },
    });
  }

  async findChat(req, res) {
    const {firstId, secondId} = req.params;

    const chat = await ChatService.findChat(firstId, secondId);

    if (!chat) {
      throw createHttpError(401, 'Chat not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found chat!`,
      data: {
        chat
      },
    });
  }

}

export default new ChatController();