import type { NextApiRequest, NextApiResponse } from 'next';
import { getBoards } from '@/app/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const boards = await getBoards();
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching boards', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}