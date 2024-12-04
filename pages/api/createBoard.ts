// pages/api/createBoard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createBoard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title } = req.body;

    try {
      const newBoard = await createBoard(title);
      res.status(201).json({ message: 'Board created', boardId: newBoard._id });
    } catch (error) {
      res.status(500).json({ message: 'Error creating board', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}