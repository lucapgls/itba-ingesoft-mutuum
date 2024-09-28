import { supabase } from "../app/(auth)/SupabaseConfig.js"

export const fetchLoans = async () => {
  // TODO -> API BACKEND
  const { data, error } = await supabase
    .from('lending_post')
    .select('*')
  if (error) {
    console.log('error', error)
    return error
  }
  return data
}

export const fetchLoansById = async (userId: any) => {
  const { data, error } = await supabase
  .from('lending_post')
  .select('*')
  .eq('lender_id', userId); 

if (error) {
  console.log('Error fetching loans by user ID:', error);
  return [];
}

return data; 
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


export const createLendingPost = async (lenderId: string, initialAmount: number, availableAmount: number, interest: number, deadline: string) => {
  
  const created_at = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('lending_post')
    .insert([
      {
        lender_id: lenderId,
        initial_amount: initialAmount,
        available_amount: availableAmount,
        interest: interest,
        dead_line: deadline,
        created_at: created_at
      }
    ])
    .select(); 

  if (error) {
    console.log('Error creating lending post:', error);
    return null;
  }

  return data?.[0]?.id || null;
};


export const createLoanRequirements = async (
  lendingPostId: number,
  requirements: Array<{ name: string; completed: boolean }>
) => {
  const formattedRequirements = {
    lending_post_id: lendingPostId,
    email_required: requirements.find(req => req.name === 'Email Required')?.completed || false,
    phone_required: requirements.find(req => req.name === 'Phone Required')?.completed || false,
  };

  const { data, error } = await supabase.from('loan_requirements').insert([formattedRequirements]);

  if (error) {
    console.error("Error inserting loan requirements:", error.message);
    throw error;
  }

  return formattedRequirements;
};