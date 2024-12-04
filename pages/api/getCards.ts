import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardsByQueueId } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { queueId } = req.query;

    try {
      const cards = await getCardsByQueueId(queueId as string);
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cards', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}