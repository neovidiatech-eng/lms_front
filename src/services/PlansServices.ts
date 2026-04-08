import api from "../lib/axios";
import { PlansResponse } from "../types/plan";

export const getPlans = async (): Promise<PlansResponse> => {
    const response = await api.get("/subscription/plans/");
    return response.data;
}