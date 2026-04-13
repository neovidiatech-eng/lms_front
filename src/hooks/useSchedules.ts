import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSchedule, createSchedule, createRecurringSchedule, deleteSchedule, deleteRecurringScheduale } from "../services/SchedulesServices";
import { UpdateSchedulePayload, CreateSchedulePayload, CreateRecurringSchedulePayload } from "../types/scheduales";
import { getAllSchedules, searchSchedules, getSchedulesForTeacher } from "../services/SessionsServices";



export const useGetSchedules = () => {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: () => getAllSchedules(),
    });
};

export const useSearchSchedules = (searchTerm: string) => {
    return useQuery({
        queryKey: ["schedules", searchTerm],
        queryFn: () => searchSchedules(searchTerm),
    });
};

export const useGetSchedulesByTeacher = (teacherId: string) => {
    return useQuery({
        queryKey: ["schedules", "teacher", teacherId],
        queryFn: () => getSchedulesForTeacher(teacherId),
        enabled: !!teacherId,
    });
};

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

export const useDeleteGroupedSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteRecurringScheduale(id),
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
