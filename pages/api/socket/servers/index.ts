import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { Server } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { serverId } = req.query;
  
    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }
  
    try {
      const server: Server | null = await db.server.findFirst({
        where: {
          id: serverId as string,
        },
        include: {
          channels: true,
          members: true,
        },
      });
  
      if (!server) {
        return res.status(404).json({ error: "Server not found" });
      }
  
      return res.status(200).json(server);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  