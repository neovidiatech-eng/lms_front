import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule, createSchedule, createRecurringSchedule, deleteSchedule } from "../services/SchedulesServices";
import { UpdateSchedulePayload, CreateSchedulePayload, CreateRecurringSchedulePayload } from "../types/scheduales";

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateSchedulePayload) => createSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: (error) => {
            console.error("Create schedule failed:", error);
        }
    });
};

export const useCreateRecurringSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateRecurringSchedulePayload) => createRecurringSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: (error) => {
            console.error("Create recurring schedule failed:", error);
        }
    });
};

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: (error) => {
            console.error("Delete schedule failed:", error);
        }
    });
};

export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSchedulePayload }) =>
            updateSchedule(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: (error) => {
            console.error("Update schedule failed:", error);
        }
    });
};
