import {model, models, Schema, Types} from 'mongoose';

export interface Boardqueue extends Document {
    _id: string;
    boardId: string;
    title: string;
  }

const BoardqueueSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    title: {type: String, required: true},
    boardId: {type: Types.ObjectId, required: true, ref: 'TrelloBoard'},
});

const BoardQueue = models.BoardQueue || model<Boardqueue>('BoardQueue', BoardqueueSchema, "board_queues");
export default BoardQueue;