import api from "../lib/axios"
import { CreateTeacherInput, TeachersFetchResponse } from "../types/teachers"

export const getTeacher = async (): Promise<TeachersFetchResponse> => {
    const response = await api.get("/teachers");
    return response.data
}
export const getTeacherById = async (id: string): Promise<TeachersFetchResponse> => {
    const response = await api.get(`/teachers/${id}`);
    return response.data
}
export const createTeacher = async (data: CreateTeacherInput): Promise<TeachersFetchResponse> => {
    const response = await api.post("/teachers/create", data);
    return response.data
}
export const updateTeacher = async (id: string, data: CreateTeacherInput): Promise<TeachersFetchResponse> => {
    const response = await api.patch(`/teachers/update/${id}`, data);
    return response.data
}
export const deleteTeacher = async (id: string): Promise<TeachersFetchResponse> => {
    const response = await api.delete(`/teachers/${id}`);
    return response.data
}