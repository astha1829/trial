import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../api/settings.service";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helper";

export const PROFILE_QUERY_KEY = ["profile"];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      showSuccessToast("Profile updated successfully");
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred while updating profile";
      showErrorToast(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}
