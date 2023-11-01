import { Hash, Users } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { MobileMembersToggle } from "@/components/mobile-members-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {

    return (
        <div className="text-md font-semibold flex justify-between px-3 items-center h-12
        border-neutral-200 dark:border-neutral-800 border-b-2 w-full">
            <div className="flex items-center">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 ml-2" />
            )}
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2"
                />
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
            </div>
            
            <div className=" md:translate-y-1">
            {type === "conversation" && (
                <ChatVideoButton />
            )}
            <MobileMembersToggle serverId={serverId} />
            </div>
            
        </div>
    )
}