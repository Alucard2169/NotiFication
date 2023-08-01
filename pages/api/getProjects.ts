import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Package {
  package_id: string;
  user_id: number | null;
  project_name: string | null;
  platform: string | null;
  notification: boolean | null;
}

interface DataProp {
  Data: Package[];
}

interface RequestData {
  id?: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataProp | ErrorResponse>
) {
  try {
    const { id }: RequestData = req.query;

    // Convert the id to an integer
    const userId = id ? parseInt(id, 10) : null;

    // store the package into the database
    const data = await prisma.packages.findMany({
      where: {
        user_id: userId,
      },
    });

    const responseData: DataProp = {
      Data: data as Package[], // Type casting to ensure compatibility
    };

    res.status(200).json(responseData);
  } catch (err: any) {
    console.log(err);
    return res.status(501).json({ error: err.message } as ErrorResponse);
  }
}
