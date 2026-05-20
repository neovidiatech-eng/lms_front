import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/AdminDashboard";

export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ['admin-dashboard'],
        queryFn: getDashboardStats,
    });
};