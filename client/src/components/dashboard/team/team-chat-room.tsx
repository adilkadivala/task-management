"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskChatRoomProps {
  taskId: string;
  teamId: string;
  taskTitle: string;
}

export function TaskChatRoom({ taskTitle }: TaskChatRoomProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockMessages = [
    {
      id: "1",
      sender: { id: "1", name: "John Doe", avatar: "/placeholder-user.jpg" },
      content: "I can help you with this task. Let me start working on it.",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: { id: "2", name: "Jane Smith", avatar: "/placeholder-user.jpg" },
      content:
        "Great! I also have some ideas for the design. Let me share them in the task details.",
      timestamp: "10:35 AM",
    },
    {
      id: "3",
      sender: { id: "1", name: "John Doe", avatar: "/placeholder-user.jpg" },
      content: "Perfect! Looking forward to collaborating with you on this.",
      timestamp: "10:40 AM",
    },
  ];

  return (
    <Card className="flex flex-col h-full border-0 rounded-none md:rounded-lg">
      <CardHeader className="border-b py-4">
        <CardTitle className="text-lg">Team Chat</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Discussion for: {taskTitle}
        </p>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Connection Status */}
        {/* {!isConnected && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Disconnected - Reconnecting...</span>
          </div>
        )} */}

        {/* Messages */}
        {mockMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage src={msg.sender.avatar || "/placeholder.svg"} />
              <AvatarFallback>{msg.sender.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{msg.sender.name}</span>
                <span className="text-xs text-muted-foreground">
                  {msg.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground break-words mt-1">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyPress={(e) => e.key === "Enter" && handleSend()}
            // disabled={!isConnected && !isLoading}
            className="flex-1"
          />
          <Button
            size="icon"
            //   onClick={handleSend} disabled={!input.trim() || (!isConnected && !isLoading)}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
