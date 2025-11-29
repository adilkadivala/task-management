import StatusCards from "./dashboard/status-card";
import { TrendingDown, TrendingUp } from "lucide-react";

const stats = {
  totalTasks: [
    {
      title: "Total Tasks",
      count: "1524",
      precentage: "12.5",
      icon: TrendingUp,
      taststast: "Overall task count increased this month.",
      tastrasio: "You're staying consistent with steady workload growth.",
    },
  ],
  todoTasks: [
    {
      title: "To-Do Tasks",
      count: "342",
      precentage: "5.2",
      icon: TrendingDown,
      taststast: "Pending tasks decreased since last week.",
      tastrasio: "Great progress—planning and execution improving.",
    },
  ],
  taskInProgress: [
    {
      title: "In-Progress Tasks",
      count: "128",
      precentage: "8.1",
      icon: TrendingUp,
      taststast: "More tasks actively being worked on.",
      tastrasio: "Team productivity is currently increasing.",
    },
  ],
  taskCompleted: [
    {
      title: "Completed Tasks",
      count: "1054",
      precentage: "14.3",
      icon: TrendingDown,
      taststast: "You completed more tasks than last month.",
      tastrasio: "Excellent momentum—keep maintaining this pace!",
    },
  ],
};

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* total task */}
      {stats.totalTasks.map((totaltask) => (
        <StatusCards
          key={totaltask.count}
          title={totaltask.title}
          count={totaltask.count}
          precentage={totaltask.precentage}
          icon={totaltask.icon}
          tastrasio={totaltask.tastrasio}
          taststast={totaltask.taststast}
        />
      ))}
      {stats.todoTasks.map((todotask) => (
        <StatusCards
          key={todotask.count}
          title={todotask.title}
          count={todotask.count}
          precentage={todotask.precentage}
          icon={todotask.icon}
          tastrasio={todotask.tastrasio}
          taststast={todotask.taststast}
        />
      ))}
      {stats.taskInProgress.map((progresstask) => (
        <StatusCards
          key={progresstask.count}
          title={progresstask.title}
          count={progresstask.count}
          precentage={progresstask.precentage}
          icon={progresstask.icon}
          tastrasio={progresstask.tastrasio}
          taststast={progresstask.taststast}
        />
      ))}
      {stats.taskCompleted.map((completedtask) => (
        <StatusCards
          key={completedtask.count}
          title={completedtask.title}
          count={completedtask.count}
          precentage={completedtask.precentage}
          icon={completedtask.icon}
          tastrasio={completedtask.tastrasio}
          taststast={completedtask.taststast}
        />
      ))}
    </div>
  );
}
