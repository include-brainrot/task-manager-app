import { PrismaClient } from "@prisma/client";

export const db: PrismaClient = new PrismaClient();

export const connectDB = async () => {
  if (db) {
    await db.$connect();
    return db;
  } else {
    return null;
  }
};
