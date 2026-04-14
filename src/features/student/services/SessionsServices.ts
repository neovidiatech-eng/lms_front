import api from "../../../lib/axios"
import { GetSessionsResponse } from "../../../types/scheduales"

export const getStudentSessions = async (studentId: string): Promise<GetSessionsResponse> => {
    const response = await api.get<GetSessionsResponse>(`/schedules/student/${studentId}`)
    return response.data
}