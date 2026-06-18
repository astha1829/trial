import { api } from "@/services/auth.service";
import { ProfileSettings, UpdateProfilePayload } from "../types";

export async function fetchProfile(): Promise<ProfileSettings> {
  const response = await api.get("/api/v1/clients/profile");
  return response.data?.data || response.data; // adjust based on API structure, usually data is nested or direct
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<ProfileSettings> {
  const response = await api.patch("/api/v1/clients/profile", payload);
  return response.data?.data || response.data;
}
