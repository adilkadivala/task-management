import { DataTable } from "@/components/data-table";

import data from "@/dashboard/data.json";

const TaskManagement = () => {
  return <DataTable data={data} />;
};

export default TaskManagement;
