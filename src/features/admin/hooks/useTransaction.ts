import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllWithdrawals, getTransactions, updateWithdrawalStatus } from "../services/TransactionServices"

export const useTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions,
    })
}

export const useWithdrawals = () => {
    return useQuery({
        queryKey: ["withdrawals"],
        queryFn: getAllWithdrawals,
    })
}

export const useUpdateWithdrawal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string, status: 'approved' | 'rejected' }) => 
            updateWithdrawalStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
        },
    });
}
