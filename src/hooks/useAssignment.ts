import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAssignments, deleteAssignment, createAssignment, updateAssignment } from "../services/AssignmentServices"
import ErrorService from "../utils/ErrorService"
import { Assignment } from "../types/assignment"

export const useGetAssignments = () => {
    return useQuery({
        queryKey: ["assignments"],
        queryFn: getAssignments,
    })
}

export const useGetStudents = () => {
    return useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { getStudents } = await import("../features/admin/services/StudentServices");
            return getStudents();
        },
    })
}

export const useGetSubjects = () => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const { getSubjects } = await import("../features/admin/services/SubjectsServices");
            return getSubjects();
        },
    })
}

export const useDeleteAssignment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
            ErrorService.success("Assignment deleted successfully");
        },
        onError: (error: any) => {
            ErrorService.handleError(error);
        }
    });
};

export const useCreateAssignment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
            ErrorService.success("Assignment created successfully");
        },
        onError: (error: any) => {
            ErrorService.handleError(error);
        }
    });
};

export const useUpdateAssignment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: { id: string } & Partial<Assignment>) => updateAssignment(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
            ErrorService.success("Assignment updated successfully");
        },
        onError: (error: any) => {
            ErrorService.handleError(error);
        }
    });
};
