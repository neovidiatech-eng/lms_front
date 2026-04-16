import api from "../lib/axios"
import { GetSessionsResponse } from "../types/scheduales"

export const getUserSessions = async (search: string): Promise<GetSessionsResponse> => {
    const response = await api.get<GetSessionsResponse>(`/schedules/user/schedules?search=${search}`)
    return response.data
}