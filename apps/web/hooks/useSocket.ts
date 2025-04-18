import {
  primaryBackend,
  websocketBackend,
} from "@repo/backend-common/index.ts";
import { escape } from "querystring";
import { useEffect, useState } from "react";

export function useSocket() {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const ws = new WebSocket(`${websocketBackend}?token=bikash`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  },[]);

  return {
    loading,
    socket
  };
}
