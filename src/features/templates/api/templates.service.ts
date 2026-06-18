import { api } from "@/services/auth.service";
import {
  Template,
  SyncTemplatesResponse,
  TemplateRequirement,
  Contact,
  SendTemplatePayload,
  SendTemplateResponse
} from "../types";

export async function fetchTemplates(): Promise<Template[]> {
  const response = await api.get("/api/v1/templates");
  return response.data?.data || [];
}

export async function syncTemplates(): Promise<SyncTemplatesResponse> {
  const response = await api.post("/api/v1/templates/sync");
  return response.data;
}

export async function fetchTemplateRequirements(templateId: string): Promise<TemplateRequirement[]> {
  // If the endpoint doesn't exist yet, we'll gracefully return an empty array or handle the 404
  try {
    const response = await api.get(`/api/v1/messages/templates/${templateId}/requirements`);
    return response.data?.data || [];
  } catch (error) {

    return [];
  }
}

export async function fetchContacts(): Promise<Contact[]> {
  try {
    const response = await api.get("/api/v1/contacts/");
    return response.data?.data || [];
  } catch (error) {

    return [];
  }
}

export async function sendTestMessage(payload: SendTemplatePayload): Promise<SendTemplateResponse> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
  try {
    const response = await api.post("/api/v1/messages/template", payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {

    throw error;
  }
}
