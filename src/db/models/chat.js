import { model, Schema } from 'mongoose';
import { mongooseSaveError } from './hooks.js';

const chatSchema = new Schema({
    members: Array,
  },
  {
    timestamps: true,
  },
);

chatSchema.post('save', mongooseSaveError);

chatSchema.post('findOneAndUpdate', mongooseSaveError);

export const ChatCollection = model('Chat', chatSchema);
