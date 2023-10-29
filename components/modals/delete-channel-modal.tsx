"use client";

import qs from "query-string";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";

const iconMap = {
    [ChannelType.TEXT]: <Hash className="inline-block h-4 w-4 align-top translate-y-0.5" />,
    [ChannelType.AUDIO]: <Mic className="inline-block h-4 w-4 align-top translate-y-0.5" />,
    [ChannelType.VIDEO]: <Video className="inline-block h-4 w-4 align-top translate-y-0.5 mr-0.5" />
}

export const DeleteChannelModal = () => {
    const {isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    

    const isModalOpen = isOpen && type === "deleteChannel";
    const { server, channel } = data;


    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }

            })

            // the thing inside ${server?.id} is route
            await axios.delete(url);

            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch (error){
            console.log(error);
            
        }   finally {
            setIsLoading(false);
        }
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-zinc-800 dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                         {channel !== undefined && (
                            <span
                            className="font-semibold text-indigo-500"
                            >
                            {iconMap[channel.type]}
                            {channel?.name}</span>
                            )
                        } will be permanently deleted. 
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 dark:bg-zinc-900 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost" >
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onClick} variant="destructive">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}