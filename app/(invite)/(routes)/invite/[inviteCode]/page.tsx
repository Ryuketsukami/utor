import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
    // fetch current profile
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  // check if we have an invite code or not
  if (!params.inviteCode) {
    return redirect("/");
  }

  // check if the person trying to join the server is already in the server
  // if we match the code of the server whe are trying to join, and if we are already a member of that server
  // all we have to do is redirect the user to that server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  // if user is already in the server, we redirect him to the server
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // now, if person is not in the server, we need to make a new member
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;
