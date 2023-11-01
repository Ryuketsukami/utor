"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import qs from "query-string"

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";


// below we are kind of defining the properties that can be added via the html, and how they will be added
interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage" | "profileImage" // these need to match my objects in the uploadthing/core, we can 
}

export const imageExtensions = ["jpeg", "jpg", "png", "gif", "jfif", "ico", "cur", "bmp"]

// the things inside the {} is what we want to extract as input kind of thing
export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    //make space to render image inside
    // below  is where we have to change if we want to fix it seeing a non pdf as image
    if (value && fileType !== undefined && imageExtensions.includes(fileType) ){
        return (
          <div className="relative h-20 w-20"  >
            <Image 
                fill
                src={value}
                alt="Upload"
                className="rounded-full"
                quality={1}
            />
            <button onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button">
                <X className="h-4 w-4" />
            </button>
          </div>
        )
    }


    if (value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                <button onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button">
                <X className="h-4 w-4" />
                </button>
            </div>
        )
        
    }

    // we need to implement this in the future|| and same for the zip and rar files
    if (value && (fileType === "glb" || fileType === "gltf")) {
        return null
    }

    return (
        <UploadDropzone
            appearance={{allowedContent: "hidden"}}
            config={{mode:"auto"}}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}