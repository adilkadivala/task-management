import zod from "zod";

export const commentSchema = zod.object({
  message: zod.string(),
});

export const updateCommentSchema = commentSchema.partial();
