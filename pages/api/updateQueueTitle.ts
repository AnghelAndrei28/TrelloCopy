import type { NextApiRequest, NextApiResponse } from 'next';
import { updateQueueTitle } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, title } = req.body;

    try {
      const updatedQueue = await updateQueueTitle(id, title);
      res.status(200).json({ message: 'Queue title updated', queue: updatedQueue });
    } catch (error) {
      res.status(500).json({ message: 'Error updating queue title', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}