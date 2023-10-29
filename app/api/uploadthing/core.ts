import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
// I will need to implement video, gltf-binary, text, and other things below, and see how I can upload live2d in this too, live2d is going to be the worst
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1}})
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"]) //"model/gltf-binary", "video"
        .middleware(() => handleAuth())
        .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;