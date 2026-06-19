import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchTemplates, 
  syncTemplates, 
  fetchTemplateRequirements, 
  fetchContacts, 
  sendTestMessage 
} from "../api/templates.service";
import { toast } from "sonner";

export const TEMPLATES_QUERY_KEY = ["templates"];
export const CONTACTS_QUERY_KEY = ["contacts"];

export function useTemplates() {
  return useQuery({
    queryKey: TEMPLATES_QUERY_KEY,
    queryFn: fetchTemplates,
  });
}

export function useSyncTemplates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncTemplates,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TEMPLATES_QUERY_KEY });
      
      const isSuccess = data.success !== false && (data as any).status !== false;
      if (isSuccess) {
        const msg = typeof data.message === 'string' ? data.message : "Templates synchronized successfully";
        toast.success(msg);
      } else {
        const errorMsg = typeof data.error === 'string' 
          ? data.error 
          : typeof data.message === 'string' 
            ? data.message 
            : typeof data.error === 'object' 
              ? JSON.stringify(data.error) 
              : "Failed to sync templates";
        toast.error(errorMsg);
      }
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message 
        || error?.response?.data?.error 
        || error?.message 
        || "An error occurred while syncing templates";
      toast.error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}

export function useTemplateRequirements(templateId: string | undefined) {
  return useQuery({
    queryKey: ["templateRequirements", templateId],
    queryFn: () => fetchTemplateRequirements(templateId!),
    enabled: !!templateId,
  });
}

export function useContacts() {
  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: fetchContacts,
  });
}

export function useSendTemplate() {
  return useMutation({
    mutationFn: sendTestMessage,
    onSuccess: (data) => {
      
      const isSuccess = data.success !== false && (data as any).status !== false;
      if (isSuccess) {
        const msg = typeof data.message === 'string' ? data.message : "Test message sent successfully";
        toast.success(msg);
      } else {
        const errorMsg = typeof data.error === 'string' 
          ? data.error 
          : typeof data.message === 'string' 
            ? data.message 
            : typeof data.error === 'object' 
              ? JSON.stringify(data.error) 
              : "Failed to send test message";
        toast.error(errorMsg);
      }
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message 
        || error?.response?.data?.error 
        || error?.message 
        || "An error occurred while sending test message";
      toast.error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}
