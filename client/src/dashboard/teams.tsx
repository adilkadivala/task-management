"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewTeamForm } from "@/components/dashboard/team/new-team-form";
import { Link } from "react-router-dom";

export default function TeamsPage() {
  const [teams] = useState([
    {
      id: 1,
      name: "Design Team",
      members: 5,
      role: "owner",
      description: "UI/UX Design & Branding",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Development",
      members: 8,
      role: "admin",
      description: "Backend & Frontend Development",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Marketing",
      members: 3,
      role: "member",
      description: "Marketing & Growth",
      color: "bg-green-500",
    },
  ]);

  return (
    <div className="flex flex-col gap-6 py-6 px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground">
          Manage your teams and collaborate with members
        </p>
      </div>

      <section className="flex flex-col gap-6 mt-6">
        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NewTeamForm />
          {teams.map((team) => {
            console.log("clicked", team.id);
            return (
              <Link to={`/dashboard/teams/${team.id}`} key={team.id}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>{team.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{team.role}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {team.members} members
                      </span>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}

          {/* Add New Team Card */}
        </div>
      </section>
    </div>
  );
}
