import { supabase } from "../app/(auth)/SupabaseConfig";

export type User = {
    id: string;
    userName: string;
    email: string;
    profilePicture: string;
};

// export const getUserByEmail = async (email: string): Promise<User | null> => {
//     const { data, error } = await supabase
//         .from<User>('users')
//         .select('*')
//         .eq('email', email)
//         .single();

//     if (error) {
//         console.error('Error fetching user:', error);
//         return null;
//     }

//     return data;
// };

export const getCurrentUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  
    const email = data?.user?.email;
    console.log('User Email:', email);
  
    return email;
};

export const getCurrentUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
  
    if (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  
    const userId = data?.user.id;
    console.log('User ID:', userId);
  
    return userId;
}

