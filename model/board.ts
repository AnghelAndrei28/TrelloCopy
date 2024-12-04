import {model, models, Schema, Types} from 'mongoose';

export interface Trelloboard {
    _id: string;
    title: string;
    color: string;
}

const TrelloBoardSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    title: {type: String, required: true},
    color: {type: String, required: true},
});

const TrelloBoard = models.TrelloBoard || model<Trelloboard>('TrelloBoard', TrelloBoardSchema, "trello_boards");
export default TrelloBoard;