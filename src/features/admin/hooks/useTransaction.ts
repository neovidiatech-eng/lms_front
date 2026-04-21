import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/TransactionServices"

export const useTransactions = () => {
    return useQuery({
        queryKey: ["transactions"],
        queryFn: getTransactions,
    })
}