import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const COINGECKO_COIN_LIST_URL = 'https://api.coingecko.com/api/v3/coins/list';

let coinGeckoIDCache = {};
let conversionRateCache = {};

const RATE_LIMIT_WAIT_TIME = 8000; // 8 seconds for retry after 429 error

// Function to pause execution for a specified time
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// A utility function to get the correct CoinGecko ID for tokens, with caching
async function getCoinGeckoID(token) {
    if (coinGeckoIDCache[token]) {
        return coinGeckoIDCache[token];  // Use cached value
    }

    try {
        const coinListResponse = await axios.get(COINGECKO_COIN_LIST_URL);
        const coinList = coinListResponse.data;

        const tokenData = coinList.find(coin => coin.symbol === token.toLowerCase());

        if (!tokenData) {
            throw new Error(`Token ${token} not found on CoinGecko`);
        }

        coinGeckoIDCache[token] = tokenData.id;  // Cache the result
        return tokenData.id;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn('Rate limit hit, retrying after delay...');
            await delay(RATE_LIMIT_WAIT_TIME);  // Wait and retry
            return getCoinGeckoID(token);  // Retry the request
        }
        console.error('Error fetching CoinGecko ID:', error.message);
        throw error;
    }
}

async function convertTokenToARS(amount, token) {
    try {
        const tokenId = await getCoinGeckoID(token);
        console.log('Using CoinGecko ID:', tokenId);

        // Use cached rate if available
        if (conversionRateCache[tokenId]) {
            const rate = conversionRateCache[tokenId];
            const convertedAmount = amount * rate;
            return { amount: convertedAmount, token: 'ARS' };
        }

        const response = await axios.get(COINGECKO_API_URL, {
            params: {
                ids: tokenId,
                vs_currencies: 'ars'
            }
        });

        console.log('API Response:', response.data);

        if (!response.data[tokenId] || !response.data[tokenId].ars) {
            throw new Error(`Conversion rate for ${token} to ARS not found`);
        }

        const rate = response.data[tokenId].ars;
        conversionRateCache[tokenId] = rate;  // Cache the conversion rate

        const convertedAmount = amount * rate;

        return {
            amount: convertedAmount,
            token: 'ARS'
        };
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn('Rate limit hit, retrying after delay...');
            await delay(RATE_LIMIT_WAIT_TIME);  // Wait and retry
            return convertTokenToARS(amount, token);  // Retry the request
        }
        console.error('Error fetching conversion rate:', error.message);
        throw error;
    }
}

export { convertTokenToARS };
