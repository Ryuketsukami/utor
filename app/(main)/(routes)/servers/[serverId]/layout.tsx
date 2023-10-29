import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerSidebar } from "@/components/server/server-sidebar";
import { ServerMemberSidebar } from "@/components/server/server-member-sidebar";

const ServerIdLayout = async({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { serverId: string };
}) => { // in the return is what we render
    const profile = await currentProfile();

    if (!profile){
        return redirectToSignIn();
    }

    // if it was only id: params.serverId then anybody who knew the server id could load all the msges and info about the server
    // by adding the profileid check, we check if the person is in the server first
    const server = await db.server.findUnique({
        where: {
            id: params.serverId, // it is called "serverId" because of this folder, if it was diff forlder name, this would be diff too
            members: {
                some: {
                    profileId: profile.id, // so 
                }
            }
        }
    })

    if (!server) {
        return redirect("/");
    }

    return(
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed insert-y-0 right-0">
                <ServerMemberSidebar serverId={params.serverId} />
            </div>
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed insert-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60 md:pr-60">
                {children}
            </main>
            
        </div>
        
    )
}

export default ServerIdLayout;