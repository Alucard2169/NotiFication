import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken'
import { setCookie } from "cookies-next"; 

const prisma = new PrismaClient();

interface Data {
  user_id: number | null;
  username: string | null;
  email: string | null;
}

interface RequestData {
  username: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    const requestData: RequestData = req.body;
    const { username, email, password } = requestData;

    const saltRounds = 10;
    const user_password = await hash(password, saltRounds);

    if (!validator.isEmail(email)) {
      throw new Error('Must be a valid email');
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error('Password not strong enough');
    }

    const user = await prisma.users.create({
      data: {
        username,
        email,
        user_password,
      },
    });

    const findUser = await prisma.users.findUnique({
      where: {
        user_id: user.user_id,
      },
    });

    const userData: Data = {
      user_id: findUser?.user_id ?? null,
      username: findUser?.username ?? null,
      email: findUser?.email ?? null,
    };



    
      const token = jwt.sign({ userId: userData.user_id }, process.env.JWT_SECRET || '');
      // Set cookie with a max age of 4 days
      setCookie("token", token, {
        req,
        res,
        maxAge: 4 * 24 * 60 * 60, // 4 days in seconds
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set to true in production
        httpOnly: true,
        sameSite: "strict",
      });

    res.status(200).json(userData);
  } catch (err: any) {
    if (err.code === 'P2002') {
      if (err.meta.target === 'users_username_key') {
        return res.status(501).json({ error: 'Username Already In Use' } as ErrorResponse);
      }
      if (err.meta.target === 'users_email_key') {
        return res.status(501).json({ error: 'Email Already In Use' } as ErrorResponse);
      }
    } else {
      return res.status(501).json({ error: err.message } as ErrorResponse);
    }
  }
}
