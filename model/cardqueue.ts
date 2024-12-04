import {model, models, Schema, Types} from 'mongoose';

export interface Cardqueue extends Document {
    _id: string;
    queueId: string;
    title: string;
    description: string;
  }

const CardQueueSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    title: {type: String, required: true},
    queueId: {type: Types.ObjectId, required: true, ref: 'BoardQueue'},
    description: {type: String, required: true},
});

const CardQueue = models.CardQueue || model<Cardqueue>('CardQueue', CardQueueSchema, "card_queues");
export default CardQueue;