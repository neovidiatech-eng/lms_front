import { SubscriptionData } from "./subscription";

export type TransactionType = 'credit' | 'subscription' | 'debit';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Wallet {
  id: string;
  type: string; 
  ownerId: string | null;
  balance: number;
  currencyId: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  reason: string;
  subscriptionId: string | null;
  expenseId: string | null;
  createdAt: string;
  wallet: Wallet;
  subscription: SubscriptionData; 
}

export interface WalletHistoryResponse {
  message: string;
  status: number;
  lang: 'ar' | 'en';
  data: Transaction[];
}