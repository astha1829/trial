import { api } from "@/services/auth.service";
import { Group, CreateGroupPayload } from "../types";

export async function fetchGroups(): Promise<Group[]> {
  const response = await api.get("/api/v1/groups/");
  return response.data?.data || [];
}

export async function createGroup(payload: CreateGroupPayload): Promise<Group> {
  const response = await api.post("/api/v1/groups/", payload);
  return response.data?.data;
}
