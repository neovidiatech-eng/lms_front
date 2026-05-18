import { DashboardData, DashboardResponse } from "../../../types/AdminDasboard";
import api from "../../../lib/axios";

export const getDashboardStats = async (): Promise<DashboardData> => {
    const response = await api.get<DashboardResponse>('/system/dashboard');
    return response.data.data;
} 