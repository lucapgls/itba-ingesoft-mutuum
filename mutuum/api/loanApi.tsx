import { supabase } from "../app/(auth)/SupabaseConfig.js"

export const fetchLoans = async () => {
  const { data, error } = await supabase
    .from('lending_post')
    .select('*')
  if (error) {
    console.log('error', error)
    return error
  }
  return data
}

