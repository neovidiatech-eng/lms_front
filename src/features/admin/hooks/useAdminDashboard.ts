import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../services/AdminDashboard";
import { getLateDiscountRules } from "../services/DiscountServices";

export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ['admin-dashboard'],
        queryFn: getDashboardStats,
    });
};

export const useLateDiscountRules = () => {
    return useQuery({
        queryKey: ['late-discount-rules'],
        queryFn: getLateDiscountRules,
    });
}