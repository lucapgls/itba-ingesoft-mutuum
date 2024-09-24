require('dotenv').config();

async function getWalletBalance(walletID) {
  const fetch = (await import('node-fetch')).default;

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
      const r = await getWalletBalance(walletID);
      if (r && r.data && r.data.tokenBalances && r.data.tokenBalances.length > 0) {
        const balances = r.data.tokenBalances.map(balance => ({
          token: balance.token.symbol,
          amount: balance.amount
        }));
        console.log(balances);
        return balances;
      } else {
        console.log("No balances found.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
}

module.exports = { getWalletBalance, getWalletBalanceValue };