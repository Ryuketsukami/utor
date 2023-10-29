import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

// we are gonna go through all the servers, and we are gonna go to the first one that someone in that server has that profile id
// we getting the user, if it doesnt exist we create one, if the user is in a server we get it, else we redirect him to create one
const SetupPage = async () => {
    const profile = await initialProfile();
    
    const server = await db.server.findFirst({ 
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server){
        return redirect(`/servers/${server.id}`);
    }

    // user is not in a server so we redirect him to create a server, we might add an option to join a server instead as well
    return <InitialModal />;
}
 
export default SetupPage;