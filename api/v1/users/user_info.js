import { supabase } from '../../supabase_config.js';

export const getUserInfo = async (user_id) => {
    console.log(user_id);
    

    const {data, error } = await supabase
    .from('users_info')
    .select('*')
    .eq('id', user_id);
    
    console.log(data);

    if (error) {
        throw new Error('Error fetching user info');
    }

    return data;
};

export const setEmail = async (user_id, email) => {
    const { data, error } = await supabase
        .rpc('set_email', {
            p_user_id: user_id,
            p_email: email
        });

    if (error) {
        throw new Error('Error setting email');
    }
};


export const setDisplayName = async (user_id, display_name) => {
    const { data, error } = await supabase
        .rpc('set_display_name', {
            p_user_id: user_id,
            p_display_name: display_name
        })

    if (error) {
        throw new Error('Error setting display name');
    }
}