"use client";

import { useState } from "react";
import { Trash2, Check, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockNotifications = [
  {
    id: "1",
    type: "task",
    title: "Task assigned to you",
    message: "You've been assigned to 'Design landing page'",
    actor: "Sarah Johnson",
    avatar: "/placeholder-user.jpg",
    timestamp: "2024-12-13 10:30 AM",
    read: false,
    relatedId: "task-1",
  },
  {
    id: "2",
    type: "comment",
    title: "New comment on task",
    message: "Mike Chen commented on 'Fix login bug'",
    actor: "Mike Chen",
    avatar: "/placeholder-user.jpg",
    timestamp: "2024-12-13 09:15 AM",
    read: false,
    relatedId: "task-2",
  },
  {
    id: "3",
    type: "team",
    title: "Added to team",
    message: "You've been added to the Design Team",
    actor: "Admin",
    avatar: "/placeholder-user.jpg",
    timestamp: "2024-12-12 03:45 PM",
    read: true,
    relatedId: "team-1",
  },
  {
    id: "4",
    type: "task",
    title: "Task completed",
    message: "Task 'Update documentation' has been marked as done",
    actor: "Jane Smith",
    avatar: "/placeholder-user.jpg",
    timestamp: "2024-12-12 02:20 PM",
    read: true,
    relatedId: "task-3",
  },
  {
    id: "5",
    type: "mention",
    title: "You were mentioned",
    message: "Emily Davis mentioned you in a comment",
    actor: "Emily Davis",
    avatar: "/placeholder-user.jpg",
    timestamp: "2024-12-11 11:00 AM",
    read: true,
    relatedId: "task-4",
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "task":
      return "📋";
    case "comment":
      return "💬";
    case "team":
      return "👥";
    case "mention":
      return "@";
    default:
      return "🔔";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${
                  unreadCount !== 1 ? "s" : ""
                }`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={deleteAll}
              className="text-red-600 bg-transparent"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </Button>
      </div>

      {filteredNotifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">
              {notifications.length === 0
                ? "No notifications yet"
                : "No unread notifications"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredNotifications.map((notification, idx) => (
            <div key={notification.id}>
              <div
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                  !notification.read
                    ? "bg-blue-50 border-blue-200"
                    : "bg-background"
                }`}
              >
                <div className="text-2xl pt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{notification.title}</p>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {idx < filteredNotifications.length - 1 && (
                <Separator className="my-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
