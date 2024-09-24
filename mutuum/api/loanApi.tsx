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


export const fetchLoanRequirements = async (lendingPostId: any) => {
    const { data, error } = await supabase
      .from('loan_requirements')
      .select('*')
      .eq('lending_post_id', lendingPostId);
    
    if (error) {
        console.log('Error fetching loan requirements:', error);
        return [];
    }

    // Mapeo para crear un array de requisitos
    const requirements: { name: string; completed: boolean }[] = [];
    
    if (data) {
        data.forEach(req => {
            if (req.email_required !== undefined) {
                requirements.push({
                    name: "Email Required",
                    completed: req.email_required
                });
            }
            if (req.phone_required !== undefined) {
                requirements.push({
                    name: "Phone Required",
                    completed: req.phone_required
                });
            }
            
        });
    }

    return requirements;
};

