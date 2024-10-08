import { supabase } from '../../supabase_config.js';
import { getWalletId } from './user.js';

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

    const walletID = await getWalletId(user.id);
    user.wallet_id = walletID;

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