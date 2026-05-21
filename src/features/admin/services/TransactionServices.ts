import api from "../../../lib/axios"
import {
    TransactionStats,
    TransactionStatsResponse,
    WalletHistoryResponse,
    WithdrawalApiResponse,
} from "../../../types/transaction";

export const getTransactions = async (currencyId: string): Promise<WalletHistoryResponse> => {
    const response = await api.get("/transactions/", {
        params: { currencyId },
    });
    return response.data;
}

export const getTransactionStats = async (currencyId: string): Promise<TransactionStats> => {
    const response = await api.get<TransactionStatsResponse>("/transactions/stats", {
        params: { currencyId },
    });
    return response.data.data;
}

export const getAllWithdrawals = async (): Promise<WithdrawalApiResponse> => {
    const response = await api.get("/withdrawals/all");
    return response.data;
}

export const updateWithdrawalStatus = async (
    id: string,
    status: 'approve' | 'reject',
    adminNotes?: string,
): Promise<any> => {
    const body = adminNotes ? { adminNotes } : {};
    const response = await api.patch(`/withdrawals/${id}/${status}`, body);
    return response.data;
}
