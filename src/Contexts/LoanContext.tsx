import React, { createContext, FC, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export interface Loan {
    amount: number;
    apr: number;
    term: number;
    status: string;
    owner_id: number;
    id: number;
}

export interface FormData {
    amount: { value?: number, error: boolean };
    apr: { value?: number, error: boolean };
    term: { value?: number, error: boolean };
}

interface LoanContextType {
    loans: Loan[];
    getLoans: () => Promise<void>;
    createLoan: (formData: FormData, cb: () => void) => Promise<any>;
    loansLoading: boolean;
    loansError: string;
}

export const LoanContext = createContext<LoanContextType>({
    loans: [],
    getLoans: async () => {},
    createLoan: async () => {},
    loansLoading: true,
    loansError: '',
});

const baseUrl = 'https://lending-api.azurewebsites.net';

export const LoanProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loansLoading, setLoansLoading] = useState(true);
    const [loansError, setLoansError] = useState('');
    const { currentUser } = useContext(UserContext);

    const getLoans = async () => {
        if (currentUser) {
            try {
                const result = await axios.get(`${baseUrl}/users/${currentUser.id}/loans`);
                setLoans(result.data);
            } catch (err: any) {
                setLoansError(err);
            } finally {
                setLoansLoading(false);
            }
        }
    };

    const createLoan = async (loanData: FormData, callback: (success?: boolean) => void) => {
        if (currentUser) {
            setLoansLoading(true)
            try {
                await axios.post(`${baseUrl}/loans`, {
                    amount: loanData.amount.value,
                    apr: loanData.apr.value,
                    term: loanData.term.value,
                    status: 'active',
                    owner_id: currentUser.id,
                });
                callback(true)
                getLoans().then()
            } catch (err: any) {
                setLoansLoading(false)
                setLoansError(err)
                console.log(err);
            }
        }
    };

    return (
        <LoanContext.Provider value={{ loans, getLoans, createLoan, loansLoading, loansError }}>
            {children}
        </LoanContext.Provider>
    );
};