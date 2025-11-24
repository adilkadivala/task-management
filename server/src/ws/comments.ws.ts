import { WebSocketServer, WebSocket } from "ws";
import { Comment } from "../models/comments";
import { Task } from "../models/tasks";
import { Team } from "../models/team";
import jwt from "jsonwebtoken";
import url from "url";

interface CommentRoom {
  [taskId: string]: WebSocket[];
}

const rooms: CommentRoom = {};

// WebSocket server
export const initCommentWS = () => {
  const wss = new WebSocketServer({ port: 3001 });

  wss.on("connection", async (socket: WebSocket, req) => {
    try {
      const query = url.parse(req.url!, true).query;
      const token = query.token as string;

      if (!token) return socket.close();

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      (socket as any).userId = decoded.id;
    } catch (err) {
      socket.close();
      return;
    }

    socket.on("message", async (rawMessage) => {
      try {
        // @ts-ignore
        const msg = JSON.parse(rawMessage.toLocaleString());

        // JOIN ROOM
        if (msg.type === "join") {
          const taskId = msg.payload.taskId;
          if (!taskId) return;

          if (!rooms[taskId]) rooms[taskId] = [];

          // avoid duplicate sockets
          if (!rooms[taskId].includes(socket)) {
            rooms[taskId].push(socket);
          }

          // attach room to socket
          (socket as any).room = taskId;
          console.log("JOIN MSG:", msg);
          console.log("JOINED ROOM:", taskId);
          console.log("SOCKET ROOM LIST:", rooms[taskId].length);

          console.log("joined task room:", taskId);
          return;
        }

        // CHAT MESSAGE
        if (msg.type === "chat") {
          const userId = (socket as any).userId;
          const roomId = msg.payload.taskId || (socket as any).room;
          const message = msg.payload.message;

          console.log("CHAT EVENT RECEIVED");
          console.log("userId:", userId);
          console.log("roomId:", roomId);

          if (!roomId || !message) {
            console.log("❌ Missing roomId or message");
            return;
          }

          const task = await Task.findById(roomId);
          if (!task || !task.teamId) {
            console.log("❌ Task not found or no teamId:", roomId);
            return;
          }

          const team = await Team.findById(task.teamId);
          if (!team) {
            console.log("❌ Team not found:", task.teamId);
            return;
          }

          const isMember = team.members.some((m) => m.toString() === userId);
          console.log("Team members:", team.members);
          console.log("Checking userId:", userId);

          if (!isMember) {
            console.log("❌ User is not a team member");
            return;
          }

          const savedComment = await Comment.create({
            taskId: roomId,
            userId,
            message,
          });

          const chatPayload = JSON.stringify({
            type: "receive-message",
            payload: {
              _id: savedComment._id,
              taskId: roomId,
              userId,
              message,
              createdAt: savedComment.createdAt,
            },
          });

          if (!rooms[roomId]) {
            return;
          }

          // broadcast inside room
          rooms[roomId].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(chatPayload);
            }
          });
          if (!task) return console.log("❌ Task not found:", roomId);
          if (!team)
            return console.log("❌ Team not found for task:", task.teamId);
          if (!isMember)
            return console.log("❌ User is not a team member:", userId);
        }
      } catch (err) {
        console.log("here closed from message");
        console.log("WS Error:", err);
      }
    });

    socket.on("close", () => {
      for (const taskId in rooms) {
        if (!rooms[taskId]) return;

        rooms[taskId] = rooms[taskId].filter((s) => s !== socket);
        if (rooms[taskId].length === 0) delete rooms[taskId];
      }
    });
  });
};
