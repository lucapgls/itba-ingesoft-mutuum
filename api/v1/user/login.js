import { supabase } from '../../supabase_config.js';

async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        console.error('Error logging in:', error.message)
        return { success: false, error: error.message }
    }

    const { user, session } = data;
    return { success: true, user: user, session: session }
}

export default loginUser