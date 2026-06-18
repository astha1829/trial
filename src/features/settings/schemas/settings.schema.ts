import { z } from "zod";

export const settingsSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  whatsapp_app_id: z.string().min(1, "WhatsApp App ID is required"),
  whatsapp_phone_id: z.string().min(1, "WhatsApp Phone ID is required"),
  whatsapp_token: z.string().min(1, "WhatsApp Access Token is required"),
});

export type SettingsSchemaType = z.infer<typeof settingsSchema>;
