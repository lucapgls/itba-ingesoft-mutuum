import { createWallet } from '../wallet/wallet.js';
import { supabase } from '../../supabase_config.js';

async function createUser(email, password) {
    // Sign up the user
    const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        throw new Error(signUpError.message);
    }

    // Fetch the user details after signing up
    const { user, session } = data;
   
    if (!user || !session) {
        throw new Error('Error fetching user details');
    }

    // Create a wallet for the user
    const wallet_ids = await createWallet();
    if (!wallet_ids) {
        throw new Error('Error creating wallet');
    }
    const wallet_id = wallet_ids[0];

    // Call the RPC function to set the wallet ID
    const { error: rpcError } = await supabase.rpc('set_wallet_id', {
        uid: user.id,
        new_wallet_id: wallet_id,
    });

    if (rpcError) {
        throw new Error('Error: Loading wallet to DB: ' + rpcError.message);
    }

    return { user, wallet_id };
}

export { createUser };