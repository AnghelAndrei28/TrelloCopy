"use server";

import connectMongo from "@/db/mongoose";
import client from "@/lib/mongodb";
import TrelloBoard from "@/model/board";
import CardQueue from "@/model/cardqueue";
import { Types } from "mongoose";
import BoardQueue from "@/model/boardqueue";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const mongoClient = await client.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    ); // because this is a server action, the console.log will be outputted to your terminal not in the browser
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}

export async function createBoard(title: string) {
  await connectMongo();
  const newBoard = new TrelloBoard({
    _id: new Types.ObjectId(),
    title,
    color: "white",
  });
  await newBoard.save();
  return newBoard;
}

export async function getBoards() {
  await connectMongo();
  const boards = await TrelloBoard.find({});
  return boards;
}

export async function deleteBoard(id: string) {
  await connectMongo();
  await TrelloBoard.findByIdAndDelete(id);
}

export async function editBoard(id: string, title: string) {
  await connectMongo();
  const updatedBoard = await TrelloBoard.findByIdAndUpdate(id, { title }, { new: true });
  return updatedBoard;
}

export async function getAllQueues(boardId: string) {
  await connectMongo();
  const queues = await BoardQueue.find({ boardId });
  return queues;
}

export async function createQueue(boardId: string, title: string) {
  await connectMongo();
  const newQueue = new BoardQueue({
    _id: new Types.ObjectId(),
    boardId, 
    title });
  await newQueue.save();
  return newQueue;
}

export async function updateQueueTitle(id: string, title: string) {
  await connectMongo();
  const updatedQueue = await BoardQueue.findByIdAndUpdate(id, { title }, { new: true });
  return updatedQueue;
}

export async function deleteQueue(id: string) {
  await connectMongo();
  await BoardQueue.findByIdAndDelete(id);
}

export async function getCardsByQueueId(queueId: string) {
  await connectMongo();
  const cards = await CardQueue.find({ queueId });
  return cards;
}

export async function addCard(queueId: string, title: string, description: string) {
  await connectMongo();
  const newCard = new CardQueue({ 
    _id: new Types.ObjectId(),
    queueId, 
    title, 
    description });
  await newCard.save();
  return newCard;
}

export async function updateCard(id: string, title: string, description: string) {
  await connectMongo();
  const updatedCard = await CardQueue.findByIdAndUpdate(id, { title, description }, { new: true });
  return updatedCard;
}

export async function deleteCard(id: string) {
  await connectMongo();
  await CardQueue.findByIdAndDelete(id);
}

export async function getBoardById(id: string) {
  await connectMongo();
  const board = await TrelloBoard.findById(id);
  return board;
}