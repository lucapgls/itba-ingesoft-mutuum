import API_BASE_URL from "./api_temp"

const API_SLUG = (slug: string) => {
    return `${API_BASE_URL}/api/v1/wallets${slug}`
};

interface WalletBalance {
    amount: number;
    token: string;
}

const getWalletBalance = async (userId: string): Promise<WalletBalance> => {
    const response = await fetch(API_SLUG(`/balance?walletID=${userId}`));
    const data = await response.json();
    const { amount, token } = data.balances[0];
    return { amount, token };
}

const getConvertToARS = async (fromAmount: number, fromToken: string) => {
    const response = await fetch(API_SLUG(`/convert?amount=${fromAmount}&token=${fromToken}`));
    const data = await response.json();
    const { amount, token } = data.convertedAmount;
    return { amount, token };
};

const postWalletTransaction = async (fromWalletID: string, toWalletID: string, amount: number) => {
    const response = await fetch(API_SLUG(`/transaction`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromWalletID,
            toWalletID,
            amount
        })
    });
    const data = await response.json();
    return data;
}


const getWalletID = async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/walletID?userID=${userId}`);
    const data = await response.json();
    return data.walletID;
}

export { getWalletBalance, getConvertToARS, postWalletTransaction, getWalletID };