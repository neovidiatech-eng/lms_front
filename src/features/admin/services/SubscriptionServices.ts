import api from "../../../lib/axios";

export const getSubscription = async () => {
    const response = await api.get("/subscription/");
    return response.data;
};