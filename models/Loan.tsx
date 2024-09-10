import { Key } from "react";

export interface Loan {
    [x: string]: Key | null | undefined;
    role: 'borrower' | 'lender';
    userId: string; 
    amount: number;
    coinType: string; // e.g., 'USD', 'EUR', 'BTC', etc.
    interests: number; // Interest rate as a percentage
    quotas: number; // Number of quotas or installments
}