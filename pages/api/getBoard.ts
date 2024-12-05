import type { NextApiRequest, NextApiResponse } from 'next';
import { getBoardById } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const board = await getBoardById(id as string);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.status(200).json(board);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching board', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}