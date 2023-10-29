"use client";

import { X } from "lucide-react";
import Image from "next/image";


import { UploadDropzone } from "@/lib/uploadthing";


// below we are kind of defining the properties that can be added via the html, and how they will be added
interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage" // these need to match my objects in the uploadthing/core, we can 
}



// the things inside the {} is what we want to extract as input kind of thing
export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    
    //make space to render image inside
    // below  is where we have to change if we want to fix it seeing a non pdf as image
    if (value && fileType != "pdf"){
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

    return (
        <UploadDropzone 
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