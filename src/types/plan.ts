export type Currency = {
    name_en: string;
    name_ar: string;
    symbol: string;
    code: string;
};
export type Plan = {
    id: string;
    name_en: string;
    name_ar: string;
    price: string;
    duration: number;
    active: boolean;
    bestSeller: boolean;
    currency: Currency;
};
export type PlansResponse = {
    message: string;
    status: number;
    data: Plan[];
};