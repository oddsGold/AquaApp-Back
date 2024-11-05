class SocketController {
  constructor() {
    this.onlineUsers = [];
  }

  addOnlineUsers(socketId, userId) {
    if (!this.onlineUsers.some((user) => user.userId === userId)) {
      this.onlineUsers.push({
        userId,
        socketId,
      });
    }
    return this.onlineUsers;
  }

  removeUser(socketId) {
    this.onlineUsers = this.onlineUsers.filter((user) => user.socketId !== socketId);
    return this.onlineUsers;
  }

  sendMessage(message) {
    return this.onlineUsers.find(user => user.userId === message.recipientId);
  }
}

const instance = new SocketController();
export default instance;
