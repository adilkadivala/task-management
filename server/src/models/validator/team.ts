import zod from "zod";

export const teamSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  members: zod.string(),
  createdBy: zod.string(),
  tasks: zod.string(),
});
