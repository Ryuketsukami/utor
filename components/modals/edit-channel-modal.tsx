"use client";

import qs from "query-string";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ChannelType } from "@prisma/client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useEffect } from "react";

// the refine is there so that the user cant name a channel as general
const formSchema = z.object({
    name: z.string().min( 1, { message: "Channel name is required." }).refine(name => name!== "general", {message: "Channel name cannot be 'general'"}),
    type: z.nativeEnum(ChannelType)
});

export const EditChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editChannel";
    const {channel, server } = data;


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT,
        }
    })

    // why use the useEffect? because the modal is rendered before we get the channel data, so it needs to be retriggered
    useEffect(() => {
        if(channel) {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type)
        }
    }, [isModalOpen]); // initially there were form and channel in this


    const isLoading = form.formState.isSubmitting;

    // this is when we submit whatever we were doing, if it was to make a server or if it was something else
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })
        

            console.log(values)

            // patch edits in the server, post uploads to the server, delete deletes from server
            await axios.patch(url, values);
            
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }
    
    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:bg-zinc-800 dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6 ">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) =>(
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                maxLength={24}
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 
                                                placeholder:text-black placeholder:capitalize"
                                                placeholder="Enter channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                        </div>
                        <DialogFooter className="bg-gray-100 dark:bg-zinc-900 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}