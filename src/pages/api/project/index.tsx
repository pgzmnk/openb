import { NextApiRequest, NextApiResponse } from 'next';
import { Project } from '@/interfaces';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Project>
) {

    const { query, method } = req
    const id = query.id as string
    const name = query.name as string

    switch (method) {
        case 'GET':
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
        case 'POST':
            // Create data in your database
            res.status(200).json({ id, name: name || `User ${id}` })
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}