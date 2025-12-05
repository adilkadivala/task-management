"use client";
import { ChevronLeft, BarChart3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useParams } from "react-router-dom";
import { InviteMemberForm } from "./invite-member";

const mockTeam = {
  id: "1",
  name: "Design Team",
  description: "UI/UX Design & Branding",
  members: 5,
  color: "bg-blue-500",
  tasksCount: 24,
  completedTasks: 18,
};

const mockMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    joined: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    role: "Member",
    joined: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Member",
    joined: "2024-03-10",
    status: "inactive",
  },
];

const mockTeamTasks = [
  {
    id: "1",
    title: "Design system update",
    priority: "high",
    status: "in-progress",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "2",
    title: "Create UI components",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Mike Chen",
  },
  {
    id: "3",
    title: "Brand guidelines",
    priority: "low",
    status: "done",
    assignedTo: "Emily Davis",
  },
];

export default function AboutTeam() {
  const { teamId } = useParams();
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Link to="/dashboard/teams">
        <Button variant="ghost" className="gap-2 mb-4">
          <ChevronLeft className="w-4 h-4" />
          Back to Teams
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold break-words">{mockTeam.name}</h1>
            <p className="text-muted-foreground mt-1">{mockTeam.description}</p>
          </div>
        </div>
        <InviteMemberForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{mockTeam.members}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Total Members
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{mockTeam.tasksCount}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {Math.round(
                  (mockTeam.completedTasks / mockTeam.tasksCount) * 100
                )}
                %
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Completion Rate
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 divide-y">
                {mockMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{member.name}</p>
                          <Badge
                            variant="secondary"
                            className="text-xs shrink-0"
                          >
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <Badge
                        variant={
                          member.status === "active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-600">
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 divide-y">
                {mockTeamTasks.map((task) => (
                  <Link
                    key={task.id}
                    to={`/dashboard/teams/${teamId}/tasks/${task.id}`}
                    
                  >
                    <div className="flex items-start justify-between py-4 first:pt-0 last:pb-0 hover:bg-muted/50 px-2 -mx-2 rounded transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold hover:underline break-words">
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Assigned to: {task.assignedTo}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2 flex-wrap justify-end">
                        <Badge
                          className={
                            task.priority === "high"
                              ? "bg-orange-100 text-orange-800"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <Badge
                          className={
                            task.status === "done"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
