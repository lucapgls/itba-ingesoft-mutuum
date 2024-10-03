import API_BASE_URL from "./api_temp"

interface WalletBalance {
    amount: number;
    token: string;
}

const getWalletBalance = async (userId: string): Promise<WalletBalance> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/wallet/balance?walletID=${userId}`);
    const data = await response.json();
    const { amount, token } = data.balances[0];
    return { amount, token };
}

const getConvertToARS = async (fromAmount: number, fromToken: string) => {
	const response = await fetch(`${API_BASE_URL}/api/v1/wallet/convert?amount=${fromAmount}&token=${fromToken}`);
	const data = await response.json();
    const { amount, token } = data.convertedAmount;
    return { amount, token };
};

export { getWalletBalance, getConvertToARS };