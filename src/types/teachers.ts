export interface Teacher {
    id: string;
    name: string;
    email: string;
    phone: string;
    code_country: string;
    currency_id: string;
    gender: 'male' | 'female';
    hour_price: number;
    active: boolean;
    subject_ids: string[];
    createdAt: string;
    updatedAt: string;
    password?: string;
}

export interface CreateTeacherInput {
    name: string;
    email: string;
    password?: string;
    phone: string;
    code_country: string;
    currency_id: string;
    gender: 'male' | 'female';
    hour_price: number;
    active: boolean;
    subject_ids: string[];
}

export interface TeachersFetchResponse {
    message: string;
    status: number;
    data: Teacher[];
}
