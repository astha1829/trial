import { z } from "zod";

export const createContactSchema = z.object({
  first_name: z
    .string()
    .min(1, "First Name is required")
    .max(100, "First Name must be less than 100 characters"),
  last_name: z
    .string()
    .max(100, "Last Name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  mobile_number: z
    .string()
    .min(1, "Mobile Number is required")
    .max(20, "Mobile Number must be less than 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  language_code: z
    .string()
    .default("en_US"),
  country: z
    .string()
    .default("IN"),
  marketing_opt_in: z
    .boolean()
    .default(false),
  group_ids: z
    .array(z.string())
    .min(1, "At least one group must be selected"),
});

export type CreateContactSchemaType = z.input<typeof createContactSchema>;
