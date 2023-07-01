import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
