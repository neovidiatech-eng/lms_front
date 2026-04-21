import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorService from "../../../utils/ErrorService";
import { createRequest, getTeacherRequest } from "../services/TechaerRequestsServices";
import { CreateRequestParams } from "../../../types/requests";

export const useCreateRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateRequestParams) => createRequest(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            ErrorService.success(data.message || "Request created successfully");
        },
        onError: (error: any) => {
            ErrorService.error(error.response?.data?.message || "Failed to create request");
        }
    });
};

export const useGetTeacherRequest = () => {
    return useQuery({
        queryKey: ["requests"],
        queryFn: () => getTeacherRequest(),
    });
};