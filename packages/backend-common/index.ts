import { prismaClient } from "@repo/db/db.ts";

import jwt from "jsonwebtoken";

export const jwtSecret = process.env.JWT_SECRET || "secret";

export const primaryBackend = 'http://localhost:5000'
export const websocketBackend = 'ws://localhost:9000'

export async function validateToken(token: string): Promise<string | Error> {
  const payload = jwt.verify(token, jwtSecret);
  try {
    if (typeof payload == "string") {
      throw new Error("Invalid token");
    }
    const userId = payload.userId;

    if (!userId) {
      throw new Error("Invalid token");
    }

    const getUser = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!getUser) {
      throw new Error("user not found");
    }
    return getUser.id;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
