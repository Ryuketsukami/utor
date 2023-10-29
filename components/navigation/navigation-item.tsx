"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

// proprieties of our navigationItem
interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

// these proprieties are being extracted from NavigationItemProps, id=id and such (pay attention that the && below means "in that case" and not "and")
export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams()
    const router = useRouter() //this returns the router to us

    // when we call this function, we load the specific serber that we clicked in
    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={onClick}
                className="group relative flex items-center">
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId == id ? "h-[36px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image
                        fill
                        sizes="20vw"
                        src={imageUrl}
                        alt="Channel"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}