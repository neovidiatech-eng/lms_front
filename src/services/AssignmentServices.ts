import api from "../lib/axios"
import { Assignment, AssignmentsResponse } from "../types/assignment"

export const getAssignments = async (): Promise<AssignmentsResponse> => {
    const response = await api.get<AssignmentsResponse>("/homework")
    return response.data
}

export const createAssignment = async (data: any) => {
    const response = await api.post("/homework", data)
    return response.data
}

export const updateAssignment = async (id: string, data: any) => {
    const response = await api.put(`/homework/${id}`, data)
    return response.data
}

export const deleteAssignment = async (id: string) => {
    const response = await api.delete(`/homework/${id}`)
    return response.data
}