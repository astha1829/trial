export interface ProfileSettings {
  email: string;
  whatsapp_app_id: string;
  whatsapp_phone_id: string;
  whatsapp_token: string;
}

export type UpdateProfilePayload = ProfileSettings;
