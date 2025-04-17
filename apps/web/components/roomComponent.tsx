import React from "react";
import { getMessages } from "../action/room";
import MessageComponent from "./messageComponent";

async function RoomComponent({ roomId }: { roomId: string }) {
  const messages = await getMessages(roomId);

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
      <MessageComponent chat={messages} />
    </div>
  );
}

export default RoomComponent;
