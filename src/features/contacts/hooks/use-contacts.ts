import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchContacts, createContact } from "../api/contacts.service";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helper";

export const CONTACTS_QUERY_KEY = ["contacts"];

export function useContacts() {
  return useQuery({
    queryKey: CONTACTS_QUERY_KEY,
    queryFn: fetchContacts,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
      showSuccessToast("Contact created successfully");
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred while creating the contact";
      showErrorToast(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}
