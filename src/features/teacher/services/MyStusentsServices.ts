import api from "../../../lib/axios";

export interface Subject {
    name: string;
    code: string;
}

export interface StudentData {
    name: string;
    code: string;
    email: string;
    phone: string;
    subject: Subject;
    sessions: string;
}

export interface StudentListResponse {
    message: string;
    status: number;
    lang: string;
    data: StudentData[];
}

export const getMyStudents = async () => {
    const response = await api.get<StudentListResponse>("/teachers/my-students");
    return response.data;
}