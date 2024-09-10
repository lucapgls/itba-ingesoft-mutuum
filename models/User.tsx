import { supabase } from "../app/(auth)/SupabaseConfig";

export type User = {
    id: string;
    userName: string;
    email: string;
    profilePicture: string;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from<User>('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return data;
};
