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
import { ChannelType } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";

const iconMap = {
    [ChannelType.TEXT]: <Hash className="inline-block h-4 w-4 align-top translate-y-0.5" />,
    [ChannelType.AUDIO]: <Mic className="inline-block h-4 w-4 align-top translate-y-0.5" />,
    [ChannelType.VIDEO]: <Video className="inline-block h-4 w-4 align-top translate-y-0.5 mr-0.5" />
}

export const DeleteMessageModal = () => {
    const {isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";
    const { apiUrl, query } = data;


    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            // the thing inside ${server?.id} is route
            await axios.delete(url);

            onClose();
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
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        The message will be permanently deleted.
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