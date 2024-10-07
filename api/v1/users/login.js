import { supabase } from '../../supabase_config.js';

async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error logging in:', error.message);
        return { success: false, error: error.message };
    }

    const user = data.user;

    const { data: walletData, error: walletError } = await supabase.rpc('get_user_wallet_id', {
        _user_id: user.id,
    });

    if (walletError) {
        console.error('Error fetching wallet id:', walletError.message);
        return { success: false, error: walletError.message };
    }

    if (!walletData) {
        console.error('Wallet data is null for user ID:', user.id);
        return { success: false, error: 'Wallet data not found' };
    }

    user.wallet_id = walletData;

    return { 
        success: true, 
        user: {
            id: user.id,
            email: user.email,
            displayname: user.user_metadata.full_name, // temp
            wallet_id: user.wallet_id // temp 
        }
    };
}

export default loginUser;