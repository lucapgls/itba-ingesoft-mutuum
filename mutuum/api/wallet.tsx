import API_BASE_URL from "./api_temp"

const API_SLUG = (slug: string) => {
    return `${API_BASE_URL}/api/v1/wallets${slug}`
};

interface WalletBalance {
    amount: number;
    token: string;
}

const getWalletBalance = async (userId: string): Promise<WalletBalance> => {
    try {
        console.log('Fetching wallet balance for user:', userId);
        const response = await fetch(API_SLUG(`/balance?walletID=${userId}`));
        const data = await response.json();

        // Check if balances exist and if there's at least one entry
        if (!data.balances || data.balances.length === 0) {
            console.log("No balances available");
            return { amount: 0, token: 'USDC' };
        }

        const { amount, token } = data.balances[0];
        return { amount, token };
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        throw error; // or return a default balance object, e.g., { amount: 0, token: 'N/A' }
    }
};


const getConvertToARS = async (fromAmount: number, fromToken: string) => {
    const response = await fetch(API_SLUG(`/convert?amount=${fromAmount}&token=${fromToken}`));
    const data = await response.json();
    const { amount, token } = data.convertedAmount;
    return { amount, token };
};

const postWalletTransaction = async (
  fromWalletId: string,
  toWalletId: string,
  amount: number
) => {
  try {
    console.log("Posting transaction:", {
      fromWalletId,
      toWalletId,
      amount,
    });

    const response = await fetch(API_SLUG('/transaction'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromWalletId,
        toWalletId,
        amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Transaction failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
};


const getWalletID = async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/walletId?userId=${userId}`);
    const data = await response.json();
    return data.wallet_id;
}

export { getWalletBalance, getConvertToARS, postWalletTransaction, getWalletID };