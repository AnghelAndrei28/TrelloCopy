import type { NextApiRequest, NextApiResponse } from 'next';
import { createQueue } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { boardId, title } = req.body;

    try {
      const newQueue = await createQueue(boardId, title);
      res.status(201).json({ message: 'Queue created', queue: newQueue });
    } catch (error) {
      res.status(500).json({ message: 'Error creating queue', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}