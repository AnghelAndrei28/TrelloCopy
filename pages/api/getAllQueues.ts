import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllQueues } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { boardId } = req.query;

    try {
      const queues = await getAllQueues(boardId as string);
      res.status(200).json(queues);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching queues', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}