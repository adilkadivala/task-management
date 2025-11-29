import { ChartBarPriority } from "@/components/charts/chart-bar-interactive";
import { ChartCompletionRate } from "@/components/charts/chart-completion";
import { StatusChart } from "@/components/charts/status-chart";
import { TasksByStatus } from "@/components/charts/tasks-by-status";
import { SectionCards } from "@/components/section-cards";
import { tasksApies } from "@/lib/task";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [allTasks, setAllTasks] = useState();

  const fetchTask = async () => {
    const data = await tasksApies.soloTaskStats();
    setAllTasks(data);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  console.log(allTasks);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <TasksByStatus />
      </div>
      <div className="px-4 flex flex-col w-full gap-6 lg:px-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <StatusChart />
        </div>
        <div className="w-full lg:w-1/3">
          <ChartBarPriority />
        </div>
        <div className="w-full lg:w-1/3">
          <ChartCompletionRate />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
