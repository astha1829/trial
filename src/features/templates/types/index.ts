export interface Template {
  template_id: string;
  template_name: string;
  language: string;
  category: string;
  status: string;
  parameter_format: string;
  content: string;
  fields: string[];
  last_synced?: string;
  messages_sent?: number;
  last_used?: string;
  success_rate?: number;
}

export interface SyncTemplatesResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface TemplateRequirement {
  param_name: string;
  param_type: string;
  required: boolean;
}

export interface Contact {
  contact_id?: string;
  id?: string;
  name?: string;
  first_name?: string;
  phone?: string;
  mobile_number?: string;
}

export interface SendTemplatePayload {
  template_id: string;
  contact_id: string;
  parameters: Record<string, string>;
}

export interface SendTemplateResponse {
  success: boolean;
  message?: string;
  error?: string;
}
