import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchGroups, createGroup } from "../api/groups.service";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helper";

export const GROUPS_QUERY_KEY = ["groups"];

export function useGroups() {
  return useQuery({
    queryKey: GROUPS_QUERY_KEY,
    queryFn: fetchGroups,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEY });
      showSuccessToast("Group created successfully");
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred while creating the group";
      showErrorToast(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}
