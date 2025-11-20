import { WebSocketServer, WebSocket } from "ws";
import { Comment } from "../models/comments";
import { Task } from "../models/tasks";
import { Team } from "../models/team";

interface CommentRoom {
  [taskId: string]: WebSocket[];
}

const rooms: CommentRoom = {};

// WebSocket server
export const initCommentWS = () => {
  const wss = new WebSocketServer({ port: 3001 });

  wss.on("connection", (socket: WebSocket) => {
    console.log("🔗 Client connected");

    socket.on("message", async (rawMessage) => {
      try {
        const msg = JSON.parse(rawMessage.toString());

        // Join a room
        if (msg.type === "join") {
          const taskId = msg.payload.taskId;

          if (!taskId) return;
          if (!rooms[taskId]) rooms[taskId] = [];

          if (!rooms[taskId].includes(socket)) {
            rooms[taskId].push(socket);
          }

          console.log(` User joined task room: ${taskId}`);
          return;
        }

        //  send comment
        if (msg.type === "chat") {
          const { taskId, userId, message } = msg.payload;

          // validations
          if (!taskId || !userId || !message) return;

          const task = await Task.findById(taskId);
          if (!task || !task.teamId) return;

          const team = await Team.findById(task.teamId);
          if (!team) return;

          // only members of team can chat
          const isMember = team.members.some((m) => m.toString() === userId);

          if (!isMember) return;

          // save message to DB
          const savedComment = await Comment.create({
            taskId,
            userId,
            message,
          });

          const chatPayload = {
            type: "receive-message",
            payload: {
              _id: savedComment._id,
              taskId,
              userId,
              message,
              createdAt: savedComment.createdAt,
            },
          };

          // broadcast only inside the room
          if (rooms[taskId]) {
            rooms[taskId].forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(chatPayload));
              }
            });
          }

          return;
        }
      } catch (err) {
        console.log("WS Error:", err);
      }
    });

    // disconnect
    socket.on("close", () => {
      console.log(" Client disconnected");

      for (const taskId in rooms) {
        if (!rooms[taskId]) {
          continue;
        }

        rooms[taskId] = rooms[taskId].filter((client) => client !== socket);

        if (rooms[taskId].length === 0) {
          delete rooms[taskId];
        }
      }
    });
  });
};
