"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

  const formSchema = z.object({
    name: z.string().min( 1, { message: "Server name is required." }),
    imageUrl: z.string().min( 1, { message: "Server image is required." })
  });

export const EditServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    

    const isModalOpen = isOpen && type === "editServer";

    // extract the server from the isModalOpen
    const { server } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });


    // some functions have dependency arrays, moreover, useEffect has 2 arguments, one is a callback (a function) the other is a dependency array
    // moreover, whenever u see a dependency array like here, it is usually a hook, "useEffect" is a hook
    // the way dependency arrays work is, they are what tells the function to trigger.
    // the hook only triggers, when there is a change in the dependency array
    // every time the dependency array changes, the function(callback) which is the first argument, is triggered
    // usually when the dependency array is empty, it means that the hool will be triggered once at the beginning of the lifecycle of the component and then never again.
    // this is a very common thing to do if you want to do something only once at the beginning, like data fetching
    // remember that "(inputs) => {what the function does}" is how you define inline functions
    useEffect(() => {
        if (server) {
        form.setValue("name", server.name);
        form.setValue("imageUrl", server.imageUrl)
        }
    }, [server, form, isModalOpen]);


    

    const isLoading = form.formState.isSubmitting;

    // this is when we submit whatever we were doing, if it was to make a server or if it was something else
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // this is where we patch the server url to target a specific server id to edit
            await axios.patch(`/api/servers/${server?.id}`, values);

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
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize server
                    </DialogTitle>
                    <DialogDescription className="text-center text-black p-0 overflow-hidden">
                        Give your server a personality with a name and an image you can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) =>(
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
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