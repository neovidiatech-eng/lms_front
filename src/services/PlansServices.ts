import api from "../lib/axios";
import { PlansResponse } from "../types/plan";

export const getPlans = async (): Promise<PlansResponse> => {
    const response = await api.get("/subscription/plans/", {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjFhNWFkLTVjYzktNDNkNC04OTMwLTA5YmFiYjc0NmU1NCIsImlhdCI6MTc3NTYzMjM3MSwiZXhwIjoxNzc1NjM5NTcxfQ.JcJFAJLEtn273zc7d8m3SlYiq-K_ZaZ08UuEzsTe58k`
        }
    });
    return response.data;
}