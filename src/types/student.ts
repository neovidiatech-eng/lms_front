export type StudentStatus = 'pending' | 'active' | 'inactive';

export interface UserDetails {
    id: string;
    email: string;
    name: string;
    phone: string;
    code_country: string;
    status: string;
    confirmAt: string | null;
    createdAt: string;
    updatedAt: string;
    roleId: string;
    provider: string;
}

export interface Student {
    id: string;
    user_id: string;
    birth_date: string;
    gender: 'male' | 'female';
    active: boolean;
    createdAt: string;
    updatedAt: string;
    hours: number;
    hours_attended: number;
    hours_remaining: number;
    planId: string | null;
    country: string;
    status: StudentStatus;
    user: UserDetails;
    plan: any | null;
}

export interface StudentsFetchResponse {
    message: string;
    status: number;
    data: {
        students: Student[];
        pagination: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
        };
    };
}