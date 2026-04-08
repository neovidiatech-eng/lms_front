import { useMutation, useQuery } from "@tanstack/react-query";
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from "../services/StudentServices";
import { Student } from "../types/student";

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
    return useMutation({
        mutationFn: (data: Student) => updateStudent(data.id, data),
    });
}
export const useDeleteStudent = () => {
    return useMutation({
        mutationFn: (id: string) => deleteStudent(id),
    });
}
export const useCreateStudent = () => {
    return useMutation({
        mutationFn: (data: Student) => createStudent(data),
    });
}