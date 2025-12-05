"use client";
import { ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskChatRoom } from "@/components/dashboard/team/team-chat-room";
import { Link, useParams } from "react-router-dom";

const mockTask = {
  id: "1",
  title: "Design landing page",
  description: "Create mockups and design system for the new landing page",
  priority: "high",
  status: "in-progress",
  dueDate: "2024-12-20",
  assigned: [
    { id: "1", name: "John Doe", avatar: "/placeholder-user.jpg" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder-user.jpg" },
  ],
  comments: [
    {
      id: "1",
      author: "John Doe",
      avatar: "/placeholder-user.jpg",
      content:
        "Started working on the design mockups. Will have them ready by tomorrow.",
      timestamp: "2024-12-12 10:30 AM",
    },
    {
      id: "2",
      author: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      content:
        "Great! Please make sure to follow the design system guidelines.",
      timestamp: "2024-12-12 11:15 AM",
    },
  ],
};

export default function AboutTeamTask() {
  const { teamId } = useParams();
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full">
      <Link to={`/dashboard/teams/${teamId}`}>
        <Button variant="ghost" className="gap-2 mb-2 w-fit">
          <ChevronLeft className="w-4 h-4" />
          Back to Team
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Chat Room - Left Side */}
        <div className="lg:col-span-2 flex flex-col min-h-0 overflow-hidden">
          <TaskChatRoom taskId="1" teamId="2" taskTitle={mockTask.title} />
        </div>

        {/* Task Details - Right Side */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-none">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{mockTask.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {mockTask.description}
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue={mockTask.status}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue={mockTask.priority}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Due Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                defaultValue="2024-12-20"
                className="text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                Assigned to
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {mockTask.assigned.map((member) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 shrink-0">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Comments</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {mockTask.comments.map((comment) => (
                <div key={comment.id} className="text-xs">
                  <div className="font-semibold">{comment.author}</div>
                  <p className="text-muted-foreground line-clamp-2">
                    {comment.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {comment.timestamp}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
