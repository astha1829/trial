import { api } from "@/services/auth.service";
import { Contact, CreateContactPayload } from "../types";

export async function fetchContacts(): Promise<Contact[]> {
  const response = await api.get("/api/v1/contacts/");
  return response.data?.data || [];
}

export async function createContact(payload: CreateContactPayload): Promise<Contact> {
  const response = await api.post("/api/v1/contacts/", payload);
  return response.data?.data;
}
