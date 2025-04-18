"use server";
import { prismaClient } from "@repo/db/db.ts";



export async function getRoomId(slug: string): Promise<any | null> {
  
  
  try {
    const room = await prismaClient.room.findFirst({
      where: {
        slug: slug,
      },
    });
   
    return room;
  } catch (error) {
    console.log("🚀 ~ getRoomId ~ error:", error)
    return null;
  }
}

export async function getMessages(roomId: number): Promise<any[] | null> {
  try {
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return messages;
  } catch (error) {
    return null;
  }
}
