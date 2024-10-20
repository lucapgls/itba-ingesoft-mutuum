import API_BASE_URL from "./api_temp"

const API_SLUG = (slug: string) => {
    return `${API_BASE_URL}/api/v1/loan${slug}`
};

export const createLoan = async (
    lendingPostId: string,
    borrowerId: string,
    loanAmount: number,
) => {
    try {
        const response = await fetch(API_SLUG('/create'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lendingPostId,
                borrowerId,
                loanAmount
            }),
        });

        if (!response.ok) {
            throw new Error('Error creating loan');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchLoans = async () => {
    try{
        const response = await fetch(API_SLUG('/'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching loans');
        }

        const data = await response.json();
        return data.loans;
    }
    catch (error) {
        throw error;
    }
}

export const fetchLoanByLendingPostId = async (lendingPostId: string) => {
    try {
        const response = await fetch(API_SLUG(`?lendingPostId=${lendingPostId}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching loan by lending post ID');
        }

        const data = await response.json();
        return data.loan;
    } catch (error) {
        throw error;
    }
}

export const fetchLoanById = async (loanId: string) => {
    try {
        const response = await fetch(API_SLUG(`?id=${loanId}`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching loan by ID');
        }

        const data = await response.json();
        return data.loan;
    } catch (error) {
        throw error;
    }
}

