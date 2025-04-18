import React from "react";
import { getMessages } from "../action/room";
import MessageComponent from "./messageComponent";

async function RoomComponent({ roomId }: { roomId: number }) {
  const messages = await getMessages(roomId);
  console.log("🚀 ~ RoomComponent ~ messages:", messages);

  if (!messages) {
    return (
      <>
        <div>
          <h1>Something went wrong</h1>
        </div>
      </>
    );
  }
  return (
    <div>
      <MessageComponent chat={messages} roomId={roomId} />
    </div>
  );
}

export default RoomComponent;
