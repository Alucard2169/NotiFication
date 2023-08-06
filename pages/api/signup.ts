import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

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
      throw new Error("Must be a valid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    }

    // Check if username or email already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
      select: {
        username: true,
        email: true,
      },

    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error("Username already exists");
      }
      if (existingUser.email === email) {
        throw new Error("Email already exists");
      }
    }

    const user = await prisma.users.create({
      data: {
        username,
        email,
        user_password,
      },
    });

    const userData: Data = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(
      { userId: userData.user_id },
      process.env.JWT_SECRET || ""
    );
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

    return res.status(500).json({ error: err.message } as ErrorResponse);

  }
}
