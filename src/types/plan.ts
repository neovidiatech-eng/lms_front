export type Currency = {
  id: string;
  name_en: string;
  name_ar: string;
  symbol: string;
  code: string;
};

export type Plan = {
  id: string;
  name_en: string;
  name_ar: string;
  description: string;
  price: string;
  duration: number;
  hours: number;
  features: string[];
  currencyId: string;
  active: boolean;
  bestSeller: boolean;
  currency: Currency;
};

export type PlansResponse = {
  message: string;
  status: number;
  data: Plan[];
};
