import api from "../../../lib/axios"
import { WalletHistoryResponse } from "../../../types/transaction";

export const getTransactions = async () : Promise<WalletHistoryResponse> =>{
    const response = await api.get("/transactions/");
    return response.data;
}