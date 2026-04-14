import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTeacher, deleteTeacher, getTeacher, getTeacherById, searchTeacher, updateTeacher } from "../services/TeacherServices"
import { CreateTeacherInput, Teacher, TeachersData } from "../../../types/teachers"

export const useTeacher = (search?: string) => {
    return useQuery<TeachersData>({
        queryKey: ["teachers", search],
        queryFn: () => search ? searchTeacher(search) : getTeacher(),
    })
}
export const useTeacherById = (id: string) => {
    return useQuery({
        queryKey: ["teachers", id],
        queryFn: () => getTeacherById(id),
    })
}
export const useUpdateTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateTeacherInput | Partial<Teacher> }) => updateTeacher(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["teachers", variables.id] });
        }
    });
}

export const useDeleteTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTeacher(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["teachers", id] });
        }
    });
}

export const useCreateTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateTeacherInput) => createTeacher(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teachers"] });

        }
    });
}
