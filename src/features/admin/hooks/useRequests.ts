import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorService from "../../../utils/ErrorService";
import { getRequests, changeRequestStatus } from "../services/RequestsServices";

export const useRequests = () => {
    return useQuery({
        queryKey: ["requests"],
        queryFn: () => getRequests(),
    });
};

export const useChangeRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status, adminNotes }: { id: string; status: "approve" | "reject", adminNotes: string }) =>
            changeRequestStatus(id, status, adminNotes),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            ErrorService.success(data.message || "Request status updated successfully");
        },
        onError: (error: any) => {
            ErrorService.error(error.response?.data?.message || "Failed to update request status");
        }
    });
};
