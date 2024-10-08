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
    .from('users_info')
    .upsert([{
        id: user_id,
        email: email
    }])
    .select();

    console.log(data);
    if (error) {
        throw new Error('Error setting email');
    }
};


export const setDisplayName = async (user_id, display_name) => {
    const { data, error } = await supabase
    .from('users_info')
    .upsert([{
        id: user_id,
        display_name: display_name
    }])
    .select();

    console.log(data);
    if (error) {
        throw new Error('Error setting display name');
    }
}