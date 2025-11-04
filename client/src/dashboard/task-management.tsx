import { DataTable } from "@/components/data-table";

import data from "@/dashboard/data.json";

const TaskManagement = () => {
  return (
    <div className="flex justify-center mt-1.5">
      <DataTable data={data} />
    </div>
  );
};

export default TaskManagement;
