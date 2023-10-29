import { ChannelType, MemberRole } from "@prisma/client"
import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerMemberSidebarProps {
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
// ServerSideProps is the name of the type of whatever is in the left of : is, like "export const ServerMemberSidebar = async (PI : float)"
// whatever comes inside the => {here} is where the chunk of the function goes
export const ServerMemberSidebar = async ({
    serverId
}: ServerMemberSidebarProps) => {
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
                    createdAt: "asc",
                },
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

    // here we take the members but we filter out ourselves
    const members = server?.members//.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect("/")
    }

    // here we find our current role
    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5] -translate-y-0.5">
            <div className="mt-2">
                <ServerSearch 
                    data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type]
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role]
                            }))
                        },
                    ]}
                />
            </div>
            <Separator className="bg-zinc-200 dark:bg-zinc-900/70 rounder-md my-1 " />
            <ScrollArea className="flex-1 px-3">

            {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="members"
                            role={role}
                            label="Members"
                            server={server}
                        />
                        {members.map((member) =>( 
                            <ServerMember 
                            key={member.id}
                            member={member}
                            server={server}
                            />
                        ))}
                    </div>
                    )}
            </ScrollArea>
        </div>
    )
}