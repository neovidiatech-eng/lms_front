export type StudentStatus = 'pending';

export interface Student {
    id: string;
    user_id: string;
    name: string;
    email: string;
    password?: string;
    phone: string;
    code_country: string;
    birth_date: string;
    gender: 'male' | 'female';
    active: boolean;
    created_at: string;
    updated_at: string;
    hours: number;
    hours_attended: number;
    hours_remaining: number;
    confirm_at: string | null;
    planId: string | null;
    country: string;
    status: StudentStatus;
}

export interface StudentsFetchResponse {
    message: string;
    status: number;
    data: Student[];
}