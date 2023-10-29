import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient(); //in production we dont need the globalThis.prisma, but in development we have something called hot reload and every time we change a line of code, a new prisma client would be initiallized (globalThis is not affected by hot reload)

if (process.env.NODE_ENV !== "production") globalThis.prisma = db