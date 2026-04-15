import api from "../../../lib/axios";
import { GetSessionsResponse } from "../../../types/scheduales";

export const getTeacherSchedule = async (search: string): Promise<GetSessionsResponse> => {
    const response = await api.get(`/teacher/schedule?search=${search}`);
    return response.data;
}