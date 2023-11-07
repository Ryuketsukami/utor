import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { serverId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server ID missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
        channels: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const member = server.members.find((member) => member.profileId === profile.id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    
    for (const channel of server.channels) {
      const updateKey = `chat:${channel.id}:messages:update`;

      res?.socket?.server?.io?.emit(updateKey, {
        content,
      });
    }

    return res.status(200).json({ message: "Server updated" });
  } catch (error) {
    console.log("[MESSAGE_ID", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}