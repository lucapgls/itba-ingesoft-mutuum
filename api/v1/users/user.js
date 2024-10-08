import { supabase } from '../../supabase_config.js';

async function getWalletId(userID) {
    const { data: walletData, error: walletError } = await supabase.rpc('get_user_wallet_id', {
        _user_id: userID,
    });

    if (walletError) {
        console.error('Error fetching wallet id:', walletError.message);
        return { success: false, error: walletError.message };
    }

    if (!walletData) {
        console.error('Wallet data is null for user ID:', userIDd);
        return { success: false, error: 'Wallet data not found' };
    }

    return walletData;
};

export { getWalletId };