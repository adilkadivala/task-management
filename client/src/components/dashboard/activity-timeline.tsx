"use client";

// import { format } from "date-fns";
import { Badge } from "../ui/badge";

interface ActivityTimelineProps {
  activities: any;
  isLoading?: boolean;
  isConnected?: boolean;
}

// const actionConfig = {
//   CREATED: { label: "Created" },
//   UPDATED: { label: "Updated" },
//   ASSIGNED: { label: "Assigned" },
//   UNASSIGNED: { label: "Unassigned" },
//   STATUS_CHANGED: { label: "Status Changed" },
//   DELETED: { label: "Deleted" },
// };

export function ActivityTimeline({
  activities,
  isLoading,
  isConnected,
}: ActivityTimelineProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-6 w-full max-w-3xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
              <div className="flex-1 h-px bg-gray-300" />
              <div className="w-40 h-4 bg-gray-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm font-semibold text-red-600 px-4">
              DISCONNECTED
            </span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <p className="text-muted-foreground text-sm">
            Reconnecting to live activity stream...
          </p>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-muted-foreground text-sm">
              No activity yet
            </span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-8 px-4 md:px-0">
      
        {/* const config = actionConfig[activity.action];
        const activityDate = new Date(activity.createdAt);
        const formattedTime = format(activityDate, "HH:mm");
        const formattedDate = format(activityDate, "MMM dd, yyyy"); */}

          <div 
          // key={activity._id}
           className="flex items-center gap-4 group">
            <div className="flex items-center flex-1 gap-3">
              <p className="text-sm font-semibold text-foreground">
                {/* {formattedTime} */}
                 02:52
              </p>
              <div className="flex-1 h-px border border-dashed transition-colors" />
              <div className="flex-shrink-0 flex items-center gap-2 min-w-fit">
                <div>
                  <Badge>
                    {/* {activity.details}   */}
                    team created 
                    {/* {config.label.toLowerCase()} */}
                     by
                      {/* {activity.userName}  */} John
                  </Badge>
                </div>
              </div>
              <div className="flex-1 h-px border border-dashed  transition-colors" />
              <p className="text-xs text-muted-foreground">
                {/* {formattedDate} */}
                12/10/2025
                </p>
            </div>
          </div>
        
    </div>
  );
}
