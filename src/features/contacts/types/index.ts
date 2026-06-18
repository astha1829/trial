export interface Contact {
  id: string;
  first_name: string;
  last_name: string | null;
  mobile_number: string;
  email: string | null;
  language_code: string;
  country: string;
  marketing_opt_in: boolean;
  group_ids: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateContactPayload {
  first_name: string;
  last_name?: string;
  mobile_number: string;
  email?: string;
  language_code?: string;
  country?: string;
  marketing_opt_in?: boolean;
  group_ids: string[];
}

export interface ContactsResponse {
  status: boolean;
  data: Contact[];
}

export interface CreateContactResponse {
  status: boolean;
  data: Contact;
}
