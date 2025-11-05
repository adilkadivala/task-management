import zod from "zod";

export const taskSchema = zod
  .object({
    title: zod.string().min(3, "Title must be at least 3 chars"),
    description: zod.string().min(3, "Description must be at least 5 chars"),
    priority: zod.enum(["Low", "Medium", "High"]).default("High"),
    status: zod.enum(["Todo", "Progress", "Completed"]).default("Todo"),
    dueDate: zod.string().transform((val) => new Date(val)),
  })
  .strict();

export const updateTaskSchema = taskSchema.partial().strict();
type updateTaskSchema = zod.infer<typeof updateTaskSchema>;
