import api from "../../../lib/axios";
import { TeacherProfileResponse, WithdrawalsResponse } from "../../../types/profile";

export const getTeacherProfile = async (): Promise<TeacherProfileResponse> => {
    const response = await api.get("/teacher/profile");
    return response.data;
}

export const getWithdrawals = async (): Promise<WithdrawalsResponse> => {
    const response = await api.get("/withdrawals");
    return response.data;
}

export const withdrawRequest = async (data: { amount: number }) => {
    const response = await api.post(`/withdrawals/request`, data);
    return response.data;
}