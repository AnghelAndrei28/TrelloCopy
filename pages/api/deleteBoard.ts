import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteBoard } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await deleteBoard(id as string);
      res.status(200).json({ message: 'Board deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting board', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}