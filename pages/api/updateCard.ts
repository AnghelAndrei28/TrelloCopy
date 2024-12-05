import type { NextApiRequest, NextApiResponse } from 'next';
import { updateCard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, title, description } = req.body;

    try {
      const updatedCard = await updateCard(id, title, description);
      res.status(200).json({ message: 'Card updated', card: updatedCard });
    } catch (error) {
      res.status(500).json({ message: 'Error updating card', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}