This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
/////////////////////////////////////////////////////////

 if you write a name of a folder with circular brackets, it becomes a folder for organization and does not affect the URL, so:

if foldering-wise my page is in localhost:3000/(auth)/login, in reality, i need to write: localhost:3000/login

also, any layout inside an organization folder, will affect all pages that are inside of it too


rm -rf .next // we run this in the terminal if we messed something up
npm run dev // to run the app again if we close


{
    If you are having an issue with disappearing navbar & sidebar upon leaving the server, deleting the server etc.

You can fix this by moving UploadThing's styles into global.css at the end of the file instead of in the react component.

Step 1:
- Remove the import for upload-thing styles inside file-upload.tsx component
- DELETE => import "@uploadthing/react/styles.css";

Step 2:
- Add the import at the bottom of the globals.css file instead

// globals.css
...
@import "~@uploadthing/react/styles.css";


Step 3 (optional):
- Wrap the tailwind config with "withUt":

// tailwind.config.js

const { withUt } = require("uploadthing/tw");
module.exports = withUt({
   ...leave everything the same
});
}

 # I can rename the sign-in or sign-up in .env, but then i will need to change the name of the folders in routes to new-name\[[...new-name]]

# to implement: gltf-binary-model-viewer uploading in chat, live2d in chat, AI bots, custom themes, fix it so when we upload an image, we upload a smaller version
# in the future i need to find out how to add my own theme
# [fixed] fix the fact that once we click on the server settings and then exit that screen without saving, the next time we enter, the screen data is empty
# make it so when managing members and when doing other things, we can only see the email of a member, if he enabled that setting
# make it so we delete the images in our database of a server when we delete the server ( both for the server image and also uploaded data)
# [nice] implement a server banner on the left side
# [important] make sure the back end checks if the name of the channel already exists or not for the same type of channel, if it does, dont add it and send a response to the user (this can be done in the app/api/channels/route and .../servers/route or in the [channelId]/route)
# [important] make sure that we can only upload a name of server and channel to the back end, if it is smaller than a certain size (this can be done in the app/api/channels/route and .../servers/route or in the [serverId] route)
# instead of being redirected to the general every time you select the server, make it so you get redirected to the last channel you were rendering
# [important] for mobile and original, make it so right side of the screen has the friends private messages, do not forget to add friends to prisma to begin with, with [yourId]/[friendId]
# [idea] make a personal board screen for when you chat with yourself, so that you can store data for later
# [important] make it so when I press x in the uploadthing, be it in the red x or in the modal, whatever picture was uploaded, will be deleted
# [from-above] most likely will need to do an onclick to delete based ont he "endpoint" or src or smthin // check https://docs.uploadthing.com/api-reference/react
# [important] modal, when we click on an image we open a modal with the image a bit bigger, if we click the button below we open the link of the img
# [very-important] make it so the message wraps around when too long, and that the delete and edit stays in frame
# [important] make it so when you delete a message with an image, the images also get deleted from the database
# [important] make sure you delete all the messages from the database when you delete a server
# [importamt] we should save in our database the original image and a smaller version, so we can render the smaller version in chat
# [important] make it so when someone sends a message, we hear the notification sound, also
# [important] make it so when someone send a message in a channel and we havent seen the message, for it to be marked
# [important] make it so when we scale down the video/audio conference the buttons scales as well
# [important] make it so we can have a @user call message system kind of thing
# [important] make it so when you call a person, he may hear your call
# [important] make it refresh and see when a new member joins
# [very-important] make it so it refreshes when new channel is made and when someone joins, etc
# [important] if you click leave button in a call, it should redirect you to general


# I need to be able to block or ban people from certain servers/channels or the application altogether


# pay attention to the pictures for reference
# npm i @prisma/client
# npx prisma studio // is good for seeing the server and profiles
# we are using clerk for authentication
# we are also installing components from ui.shadcn.com
# we are using planetscale for the database
# we are using uploadthing for the images upload
# we are using shadcn/ui for most of the assets
# we are using livekit.io for video and audio
# we are using railway.app to deploy our app, we cant use vercel because vercel is serverless and we are using websockets, and websockets wont work there

# we used "npm install uploadthing @uploadthing/react react-dropzone" to install uploadthing

# FileUpload: endpoint="serverImage" depending what we want to upload, look at uploadthing/core to see the possible ones to choose from

# we also "npm i uuid" and we also installed the dependencies with "npm i -D @types/uuid"
# we also installed zustand with npm i zustand

# modals are like the windows of the pop up windows, as in, a secondary mini screen menu that can be used for things like log in, create server and such

# when we use "use client" it doesn't mean that something is not rendered in the server, it still is, all it means is, that it isnt a react server component
# the only thing is that "use client" means that it is also rendered on the client, that's where it can cause hydration errors
# which happens when it is rendered in one state in the server, and in another state in the client (like a desync)
# modals are a bit problematic with that since they can be opened by useEffects and onClicks
# and since they may cause these problems, we make them not render in the server, since there it is no need for it to render in the server anyways


# The modals are like the pop ups, such as, invite friends, create new server, etc

# command "npx prisma migrate reset" resets our database
# every time we edit prisma, we need to type "npx prisma generate" and then "npx prisma db push"
# we also did npm i query-string

# if ever it is necessary in the future, we can have multiple databases where we store our data in the cloud, as in:
# multiple website or services that we need the data from all of them ,in order to validate the validity of our output or input
# the naive approach is to store the same object in multiple, but then the space taken would be too big, so what we do is to
# store some sort of compressed version that is based on the original, so that it takes less values and it can still validate
# it may not be had had erchi, but it is good enough
# we did npm i socket.io // we need one for the front end and one for the server aka back end which is below
# we did npm i socket.io-client
# at some point in the future, the pages folder might need to be made inside the app folder or something, we will need to stay up to date

# [important] 
# https://github.com/vercel/next.js/issues/55802 we changed next js source code, check link

# we used npm i emoji-mart @emoji-mart/data @emoji-mart/react
# we are installing npm i @tanstack/react-query
# we did npm i date-fns
# check lifekit documentation to see how we installed it