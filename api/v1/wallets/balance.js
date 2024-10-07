
async function getWalletBalance(walletID) {
    const url = `https://api.circle.com/v1/w3s/wallets/${walletID}/balances`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}

async function getWalletBalanceValue(walletID) {
    try {
        const response = await getWalletBalance(walletID);
        if (response && response.data && response.data.tokenBalances && response.data.tokenBalances.length > 0) {
            const balances = response.data.tokenBalances.map(balance => ({
                token: balance.token.symbol,
                amount: balance.amount
            }));
            return balances;
        } else {
            console.log("No balances found.");
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in the endpoint
    }
}

export { getWalletBalance, getWalletBalanceValue };
