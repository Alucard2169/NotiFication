// a purgin function to unsubscribe form packages at a given interval if those packages are not stored in the database


import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Package {
  package_id: string;
  user_id: number | null;
  project_name?: string | null;
  platform?: string | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.LIB_API_KEY;
    const subscriptionsUrl = `https://libraries.io/api/subscriptions?api_key=${apiKey}`;

    // Fetch the list of subscriptions from libraries.io API
    const subscriptionsResponse = await fetch(subscriptionsUrl);
    const subscriptions = await subscriptionsResponse.json();

    // Get the list of packages from the database
    const databasePackages = await prisma.packages.findMany();

    // Extract the package platforms and names from the subscriptions API response
    const subscriptionPackages = subscriptions.map((subscription: any) => ({
      platform: subscription.platform,
      name: subscription.name,
    }));

    // Find packages in the database that need to be unsubscribed
    const packagesToUnsubscribe = databasePackages.filter(
      (pkg: Package) =>
        pkg.user_id !== null &&
        subscriptionPackages.some(
          (subscriptionPkg : any) =>
            subscriptionPkg.platform === pkg.platform &&
            subscriptionPkg.name === pkg.project_name
        )
    );

    // Unsubscribe from the packages using libraries.io API
    for (const pkg of packagesToUnsubscribe) {
      const { platform, project_name } = pkg;
      const unsubscribeUrl = `https://libraries.io/api/subscriptions/${platform}/${project_name}?api_key=${apiKey}`;
      await fetch(unsubscribeUrl, { method: "DELETE" });
    }

    res.status(200).json({ message: "Unsubscription process completed" });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}
