import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteQueue } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await deleteQueue(id as string);
      res.status(200).json({ message: 'Queue deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting queue', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}