import { ChannelType, MemberRole } from "@prisma/client"
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ServerHeader } from "./server-header";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />
}

// this is a react syntax
// first line exports the component so it can be used outside
// second line defines the component proprieties
// the third line stats the component's asynchronus function
// ServerSideProps is the name of the type of whatever is in the left of : is, like "export const ServerSIdebar = async (PI : float)"
// whatever comes inside the => {here} is where the chunk of the function goes
export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    // The code below is in prisma syntax
    const server = await db.server.findUnique({
        where: {
            id: serverId,

        },
        include: {
            channels: {
                orderBy:{
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    // we will now separate each channel type in their own constant

    // this below filters the server?.channels array to only include channels that have a certain type
    // the "?" operator is used to check if the server variable is defined and not null
    // if servers is not null, it will access the channels property, else code line will return undefined
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);


    if (!server) {
        return redirect("/")
    }

    // here we find our current role
    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <ServerHeader 
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        <div className="space-y-[2px]">
                        {textChannels.map((channel) =>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            
                            />
                        ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                        />
                        <div className="space-y-[2px]">
                        {audioChannels.map((channel) =>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            
                            />
                        ))}
                        </div>
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                        />
                        <div className="space-y-[2px]">
                        {videoChannels.map((channel) =>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server}
                            
                            />
                        ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}