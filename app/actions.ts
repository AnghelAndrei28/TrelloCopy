"use server";

import connectMongo from "@/db/mongoose";
import client from "@/lib/mongodb";
import TrelloBoard, {Trelloboard} from "@/model/board";
import { Types } from "mongoose";

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