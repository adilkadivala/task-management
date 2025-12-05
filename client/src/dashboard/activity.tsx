"use client";

import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

// Mock data for demo
const mockActivities = [
  {
    _id: "1",
    action: "CREATED" as const,
    userName: "Sarah Johnson",
    details: "Created a new task",
    taskTitle: "Design landing page",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    _id: "2",
    action: "ASSIGNED" as const,
    userName: "Mike Chen",
    details: "Assigned task to team member",
    taskTitle: "API development",
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
  },
  {
    _id: "3",
    action: "STATUS_CHANGED" as const,
    userName: "Emily Davis",
    details: "Changed status from In Progress to Review",
    taskTitle: "Database schema update",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    _id: "4",
    action: "UPDATED" as const,
    userName: "Alex Martinez",
    details: "Updated task description and deadline",
    taskTitle: "Mobile app development",
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    _id: "5",
    action: "CREATED" as const,
    userName: "Lisa Wong",
    details: "Created a new sprint",
    taskTitle: "Sprint 2024-Q1",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    _id: "6",
    action: "STATUS_CHANGED" as const,
    userName: "James Brown",
    details: "Marked task as completed",
    taskTitle: "Testing framework setup",
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
];

export default function Activity() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Your All Activity On The Ground
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            Team activity history
          </p>
        </div>
      </div>

      {/* Timeline */}
      <ActivityTimeline
        activities={mockActivities}
        isLoading={false}
        isConnected={true}
      />
    </div>
  );
}
