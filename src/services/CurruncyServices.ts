import api from "../lib/axios";
import { CurrenciesData, Currency } from "../types/currency";

export const getCurrencies = async (): Promise<CurrenciesData> => {
    const response = await api.get("/transactions/currency/currencies");
    const data = response.data.data;
    return data;
};

export const getCurrencyById = async (id: string): Promise<Currency> => {
    const response = await api.get(`/transactions/currency/${id}`);
    return response.data.data;
}

export const addCurrency = async (data: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>) => {
    const cleanData = { ...data };
    delete cleanData.default;
    const response = await api.post('/transactions/currency/add-currency', cleanData);
    return response.data;
}

export const updateCurrency = async (id: string, data: Partial<Currency>) => {
    const response = await api.patch(`/transactions/currency/update-currency/${id}`, data);
    return response.data;
}

export const deleteCurrency = async (id: string) => {
    const response = await api.delete(`/transactions/currency/delete-currency/${id}`);
    return response.data;
}