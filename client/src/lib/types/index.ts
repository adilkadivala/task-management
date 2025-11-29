export interface Taks {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "Progress" | "Completed";
  dueDate: Date;
}
