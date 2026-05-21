import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllWithdrawals, getTransactions, getTransactionStats, updateWithdrawalStatus } from "../services/TransactionServices"

export const useTransactions = (currencyId: string) => {
    return useQuery({
        queryKey: ["transactions", currencyId],
        queryFn: () => getTransactions(currencyId),
        enabled: !!currencyId,
    })
}

export const useTransactionStats = (currencyId: string) => {
    return useQuery({
        queryKey: ["transaction-stats", currencyId],
        queryFn: () => getTransactionStats(currencyId),
        enabled: !!currencyId,
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
        mutationFn: ({ id, status, adminNotes }: { id: string; status: 'approve' | 'reject'; adminNotes?: string }) =>
            updateWithdrawalStatus(id, status, adminNotes),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
        },
    });
}
