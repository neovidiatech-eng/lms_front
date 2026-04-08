import api from "../lib/axios";
import { Student, StudentsFetchResponse } from "../types/student";

export const getStudents = async (): Promise<StudentsFetchResponse> => {
    const response = await api.get("/students");
    return response.data;
}
export const getStudentById = async (id: string): Promise<StudentsFetchResponse> => {
    const response = await api.get(`/students/${id}`);
    return response.data;
}
export const updateStudent = async (id: string, data: Student): Promise<StudentsFetchResponse> => {
    const response = await api.put(`/students/update/${id}`, data);
    return response.data;
}
export const deleteStudent = async (id: string): Promise<StudentsFetchResponse> => {
    const response = await api.delete(`/students/delete/${id}`);
    return response.data;
}
export const createStudent = async (data: Student): Promise<StudentsFetchResponse> => {
    const response = await api.post(`/students/create`, data);
    return response.data;
}