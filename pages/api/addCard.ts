import type { NextApiRequest, NextApiResponse } from 'next';
import { addCard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { queueId, title, description } = req.body;

    try {
      const newCard = await addCard(queueId, title, description);
      res.status(201).json({ message: 'Card created', card: newCard });
    } catch (error) {
      res.status(500).json({ message: 'Error creating card', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}