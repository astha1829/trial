import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/auth.service";
import { toast } from "sonner";

export const CAMPAIGNS_QUERY_KEY = ["campaigns"];

// API functions
const fetchCampaigns = async () => {
  const response = await api.get("/api/v1/campaigns");
  return response.data?.data || [];
};

const fetchCampaign = async (id: string) => {
  const response = await api.get(`/api/v1/campaigns/${id}`);
  return response.data?.data || null;
};

const fetchCampaignReport = async (id: string) => {
  const response = await api.get(`/api/v1/campaigns/${id}/report`);
  return response.data?.data || null;
};

const fetchCampaignItems = async (id: string, status?: string) => {
  const url = status 
    ? `/api/v1/campaigns/${id}/items?status=${encodeURIComponent(status)}` 
    : `/api/v1/campaigns/${id}/items`;
  const response = await api.get(url);
  return response.data?.data || [];
};

const createCampaign = async (payload: any) => {
  const response = await api.post("/api/v1/campaigns", payload);
  return response.data;
};

// Hooks
export function useCampaigns() {
  return useQuery({
    queryKey: CAMPAIGNS_QUERY_KEY,
    queryFn: fetchCampaigns,
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: [...CAMPAIGNS_QUERY_KEY, id],
    queryFn: () => fetchCampaign(id),
    enabled: !!id,
  });
}

export function useCampaignReport(id: string) {
  return useQuery({
    queryKey: [...CAMPAIGNS_QUERY_KEY, id, "report"],
    queryFn: () => fetchCampaignReport(id),
    enabled: !!id,
    refetchInterval: 10000,
  });
}

export function useCampaignItems(id: string, status?: string) {
  return useQuery({
    queryKey: [...CAMPAIGNS_QUERY_KEY, id, "items", status || "all"],
    queryFn: () => fetchCampaignItems(id, status),
    enabled: !!id,
    refetchInterval: 10000,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCampaign,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_QUERY_KEY });
      const isSuccess = data.success !== false && data.status !== false;
      if (isSuccess) {
        toast.success(data.message || "Campaign created successfully");
      } else {
        toast.error(data.error || data.message || "Failed to create campaign");
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An error occurred while creating campaign";
      toast.error(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    },
  });
}
