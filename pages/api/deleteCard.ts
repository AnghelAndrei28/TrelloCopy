import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await deleteCard(id as string);
      res.status(200).json({ message: 'Card deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting card', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}