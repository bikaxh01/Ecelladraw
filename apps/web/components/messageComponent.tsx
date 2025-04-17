"use client";
import { room, chat } from "../../../packages/db/generated/prisma";
import React, { useEffect, useState } from "react";
import {
  primaryBackend,
  websocketBackend,
} from "@repo/backend-common/index.ts";
import { useSocket } from "../hooks/useSocket";



function MessageComponent({ chat }: { chat: chat[] | [] }) {
  const [messages, setMessages] = useState<chat[] | []>(chat);
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (!loading && socket) {
      socket.onmessage = (event) => {
        console.log("🚀 ~ useEffect ~ event:", event);
      };
    }
  }, [socket, loading]);

  return (
    <div>
      <h1>Messages here</h1>
    </div>
  );
}

export default MessageComponent;
