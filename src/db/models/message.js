import { model, Schema } from 'mongoose';
import { mongooseSaveError } from './hooks.js';

const messageSchema = new Schema({
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.post('save', mongooseSaveError);

messageSchema.post('findOneAndUpdate', mongooseSaveError);

export const MessageCollection = model('Message', messageSchema);
