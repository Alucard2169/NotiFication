import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface Data {
  user_id: number | null;
  username: string | null;
  email: string | null;
}

interface RequestBody {
  username: string;
  password: string;
}

interface Error {
  error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    const requestData: RequestBody = req.body;
    const { username, password } = requestData;

    const usernameCheck = await prisma.users.findFirst({
      where: {
        username:username,
      },
    });

    if (!usernameCheck) {
      throw new Error('user not found, try Signing Up');
    }

    const { user_id, email, user_password } = usernameCheck;

    const match = await bcrypt.compare(password, user_password);

    if (!match) {
      throw new Error('incorrect password');
    }

    const token: string = jwt.sign({ userId: user_id }, process.env.JWT_SECRET || '');

    const data: Data = {
      user_id,
      username,
      email,
    };

    setCookie('token', token, {
      req,
      res,
      maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json(data);
  } catch (err: any) {
    res.status(501).json({ error: err.message });
  }
}
