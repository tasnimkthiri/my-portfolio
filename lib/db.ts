import { PrismaClient } from "@prisma/client";
const g = globalThis as unknown as { prisma?: PrismaClient };
export const db: PrismaClient = g.prisma ?? (g.prisma = new PrismaClient());
