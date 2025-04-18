"use client";
import { room, chat } from "../../../packages/db/generated/prisma";
import React, { useEffect, useState } from "react";
import {
  primaryBackend,
  websocketBackend,
} from "@repo/backend-common/index.ts";
import { useSocket } from "../hooks/useSocket";

function MessageComponent({
  chat,
  roomId,
}: {
  chat: chat[] | [];
  roomId: number;
}) {
  const [messages, setMessages] = useState<any>(["chat"]);
  const [input, setInput] = useState<string>("");
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (!loading && socket) {
      const joinRoom = { type: "join_room", roomId: roomId };
      socket.send(JSON.stringify(joinRoom));
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setMessages((m) => [...m, parsedData.content]);
        }
      };
    }
  }, [socket, loading]);

  const handleSend = () => {
    const chatType = { type: "chat", roomId: roomId, message: input };
    socket?.send(JSON.stringify(chatType));
    setInput("");
  };

  return (
    <div>
      <h1>Messages here</h1>

      {messages.map((m, i) => (
        <h2 key={i} className=" bg-red-300">
          {m}
        </h2>
      ))}

      <input
        type="text"
        className=" border"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageComponent;
