import type { NextApiRequest, NextApiResponse } from 'next';
import { editBoard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, title } = req.body;

    try {
      const updatedBoard = await editBoard(id, title);
      res.status(200).json({ message: 'Board updated', board: updatedBoard });
    } catch (error) {
      res.status(500).json({ message: 'Error updating board', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}