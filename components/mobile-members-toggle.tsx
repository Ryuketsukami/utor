import { Menu, Users } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar"
import { ServerSidebar } from "@/components/server/server-sidebar"
import { ServerMemberSidebar } from "./server/server-member-sidebar"

export const MobileMembersToggle = ({
    serverId
}: {serverId: string}) => {
    return(
        
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
                    <Users />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 flex gap-0">
                <ServerMemberSidebar serverId={serverId} />
            </SheetContent>
        </Sheet>
        
    )
}