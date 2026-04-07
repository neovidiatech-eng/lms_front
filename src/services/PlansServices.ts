import api from "../lib/axios";
import { PlansResponse } from "../types/plan";

export const getPlans = async (): Promise<PlansResponse> => {
    const response = await api.get("/subscription/plans/", {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhYzlmYWVkLTY2NDEtNDBhNi1hZmUxLTUyYjNmOGZhMDAzNiIsImlhdCI6MTc3NTU2MTU5NiwiZXhwIjoxNzc1NTY4Nzk2fQ.VEQXxMUzyLL4C0wNGnvpOuIc7HW_FyNDRIomOUsWmdQ`
        }
    });
    return response.data;
}