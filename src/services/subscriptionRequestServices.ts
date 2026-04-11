import api from "../lib/axios";

export interface SubscriptionRequestApi {
  id: string;
  user: {
    name: string;
    phone: string;
    email: string;
  };
  plan: {
    name_ar: string;
    name_en: string;
    price: string;
    hours: number;
  };
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

//get method
export const getSubscriptionRequests = async () => {
  const response = await api.get("/subscription/requests");

  return response.data.data.subscriptionRequests;
};
