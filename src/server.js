import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';
import { Server } from "socket.io";
import { createServer } from 'node:http';
import SocketController from './controllers/socket-controller.js';

const PORT = Number(env('PORT', '3000'));

const corsOptions = {
  // origin: (origin, callback) => {
  //   callback(null, true);
  // },
  origin:'https://aqua-app-front-5ikab6mbt-oddsgolds-projects.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  optionsSuccessStatus: 200,
};

export const startServer = () => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: 'https://aqua-app-front-5ikab6mbt-oddsgolds-projects.vercel.app',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  app.use(cors(corsOptions));
  // app.options('*', cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());

  app.use(
    pino({
      level: 'error',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
  );

  app.use(router);
  app.use('/api-docs', swaggerDocs());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  io.on('connection', (socket) => {
    socket.on("addNewUser", (userId) => {
      const response = SocketController.addOnlineUsers(socket.id, userId);
      io.emit("getOnlineUsers", response);
    });

    socket.on("sendMessage", (message) => {
      const user = SocketController.sendMessage(message);

      if(user) {
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
        });
      }
    });

    socket.on("disconnect", () => {
      const response = SocketController.removeUser(socket.id);
      io.emit("getOnlineUsers", response);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
