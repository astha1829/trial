import { z } from "zod";

export const createGroupSchema = z.object({
  title: z
    .string()
    .min(1, "Group name is required")
    .max(100, "Group Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateGroupSchemaType = z.infer<typeof createGroupSchema>;
