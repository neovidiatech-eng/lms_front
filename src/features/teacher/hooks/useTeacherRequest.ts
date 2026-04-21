import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRequest, getTeacherRequest } from "../services/TechaerRequestsServices";
import { CreateRequestParams } from "../../../types/requests";
import { message } from "antd";

export const useCreateRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateRequestParams) => createRequest(request),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["requests"] });
            message.success(data.message || "Request created successfully");
        }
    });
};

export const useGetTeacherRequest = () => {
    return useQuery({
        queryKey: ["requests"],
        queryFn: () => getTeacherRequest(),
    });
};