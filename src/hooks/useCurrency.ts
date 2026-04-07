import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addCurrency, deleteCurrency, getCurrencies, getCurrencyById, updateCurrency } from "../services/CurruncyServices"
import { Currency } from "../types/currency";

export const useCurrency = () => {
    return useQuery({
        queryKey: ["currencies"],
        queryFn: getCurrencies,
    });
}
export const useCurrencyById = (id: string) => {
    return useQuery({
        queryKey: ["currencies", id],
        queryFn: () => getCurrencyById(id)
    });
}

export const useAddCurrency = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCurrency,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currencies"] })
        },
    })
}
export const useUpdateCurrency = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Currency> }) =>
            updateCurrency(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currencies"] });
        },
        onError: (error) => {
            console.error("Update failed:", error);
        }
    });
};

export const useDeleteCurrency = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCurrency,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currencies"] })
        },
    })
}
