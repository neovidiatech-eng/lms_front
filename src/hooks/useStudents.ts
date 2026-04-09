import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../services/StudentServices";
import { Student } from "../types/student";
import { StudentFormData } from "../lib/schemas/StudentSchema";

export const useStudents = () => {
    return useQuery({
        queryKey: ["students"],
        queryFn: getStudents,
    });
}
export const useStudentById = (id: string) => {
    return useQuery({
        queryKey: ["student", id],
        queryFn: () => getStudentById(id),
    });
}
export const useUpdateStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: StudentFormData | Partial<Student> }) => updateStudent(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["student", variables.id] });
        }
    });
}
export const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteStudent(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["student", id] });
        }
    });
}
export const useCreateStudent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: StudentFormData | Partial<Student>) => createStudent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        }
    });
}