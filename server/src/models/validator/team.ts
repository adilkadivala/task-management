import zod from "zod";

export const teamSchema = zod
  .object({
    name: zod.string(),
    description: zod.string().optional(),
    members: zod.array(zod.string()).optional(),
    tasks: zod.array(zod.string()).optional(),
  })
  .strict();

export const updateTeaSchema = teamSchema.partial();
