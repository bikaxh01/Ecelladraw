import WebSocket, { WebSocketServer } from "ws";
import { validateToken } from "@repo/backend-common/index.ts";
const wss = new WebSocketServer({ port: 9000 });

interface User {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}

interface MessageType {
  type: "join_room" | "leave_room" | "chat";
  roomId: string;
  message?: string;
}

const users: User[] = [];

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  if (!token) {
    ws.close();
    return;
  }
  //TODO: get user from middleware
  const userId = token;
  console.log("🚀 ~ connection ~ userId:", userId);

  users.push({
    userId: userId,
    ws: ws,
    rooms: [],
  });

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const stringData = data.toString();
  
    const { type, roomId, message }: MessageType = JSON.parse(stringData);

    if (type == "join_room") {
      const user = users.find((user) => user.ws === ws);
      if (!user) {
        return;

      }
      user.rooms.push(roomId);
     
    }

    if (type == "leave_room") {
      const user = users.find((user) => user.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((room) => room !== roomId);
     
    }

    if (type === "chat") {

      //TODO: push to queue save to DB


      users.forEach((user) => {
        if (user.rooms.includes(roomId) && user.userId !== userId) {
          user.ws.send(
            JSON.stringify({ type: "chat", roomId, content: message })
          );
        }
      });
    }

    // console.log("received: %s", data);
    // ws.send("Kya halchal");
  });

  ws.send("something");
});
