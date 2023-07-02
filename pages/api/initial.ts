import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface Data {
  user_id: number | null;
  username: string | null;
  email: string | null;
}

interface Error {
  error: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
      const token: any | undefined = getCookie('token', { req, res });
      
    if (!token) {
      throw new Error('Login required');
    } else {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || '');
        
      const userId: number = decodedToken?.userId;
        
      if (!decodedToken) {
        throw new Error('Invalid Token');
      } else {
        const findUser = await prisma.users.findUnique({
          where: {
            user_id: userId,
          },
        });

        const userData: Data = {
          user_id: findUser?.user_id || null,
          username: findUser?.username || null,
          email: findUser?.email || null,
        };

        res.status(200).json(userData);
      }
    }
  } catch (err: any) {
    res.status(501).json({ error: err.message });
  }
}
