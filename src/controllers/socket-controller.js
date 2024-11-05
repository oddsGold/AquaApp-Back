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
}

export default new SocketController();
