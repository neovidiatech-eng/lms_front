import api from "../lib/axios";

// get plans
export const getPlans = async () => {
  try {
    const response = await api.get("/subscription/plans");
    const data = response.data.data;

    console.log(data);
    return data;
  } catch (error) {
    console.error("Get plans failed:", error);
    throw error;
  }
};

//delete plans
export const deletePlans = async (id: string) => {
  try {
    const res = await api.delete(`/subscription/plans/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// update plan
export const updatePlan = async (id: string, data: any) => {
  try {
    const res = await api.patch(`/subscription/plans/${id}`, data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Update plan failed:", error);
    throw error;
  }
};
