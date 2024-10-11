import { supabase } from '../../supabase_config.js';
import { v4 as uuidv4 } from 'uuid';


export const fetchLendingPost = async () => {

  try {
    const { data, error } = await supabase
      .from('lending_post')
      .select('*');

    if (error) {
      console.error('Error fetching lending posts:', error.message);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


export const fetchLendingPostById = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('lending_post')
      .select('*')
      .eq('lender_id', userId);

    if (error) {
      console.error(`Error fetching lending post for user ${userId}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const fetchLendingPostRequirements = async (lendingPostId) => {
  try {
    const { data, error } = await supabase
      .from('loan_requirements')
      .select('*')
      .eq('lending_post_id', lendingPostId);

    if (error) {
      console.error(`Error fetching requirements for lending post ${lendingPostId}:`, error);
      throw error;
    }

    const requirements = data.map(req => ({
      name: req.email_required ? 'Email Required' : 'Phone Required',
      completed: req.email_required || req.phone_required,
    }));
  
    return requirements;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const createLendingPost = async (lenderId, initialAmount, availableAmount, interest, deadline) => {
  const createdAt = new Date().toISOString();
  try {
    const { data, error } = await supabase
      .from('lending_post')
      .insert([{
        lender_id: lenderId,
        initial_amount: initialAmount,
        available_amount: availableAmount,
        interest: interest,
        dead_line: deadline,
        created_at: createdAt,
       
      }])
      .select();

      
    if (error) {
      console.error('Error creating lending post:', error);
      throw error;
    }
    return data?.[0]?.id || null;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const createLendingPostRequirements = async (lendingPostId, requirements) => {
  try {
    const formattedRequirements = {
      lending_post_id: lendingPostId,
      email_required: requirements.find(req => req.name === 'Email Required')?.completed || false,
      phone_required: requirements.find(req => req.name === 'Phone Required')?.completed || false,
    };

    const { data, error } = await supabase
      .from('loan_requirements')
      .insert([formattedRequirements]);

    if (error) {
      console.error("Error creating loan requirements:", error);
      throw error;
    }

    return formattedRequirements;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



// Function to create a loan
export const createLoan = async (lendingPostId, borrowerId, loanAmount) => {
  try {
    const { data, error } = await supabase.rpc('create_loan', {
      _lending_post_id: lendingPostId,
      _borrower_id: borrowerId,
      _loan_amount: loanAmount,
    });

    if (error) {
      console.error('Error creating loan:', error.message);
      return null;
    }

    return data[0]; // Return the created loan object
  } catch (error) {
    console.error('Error creating loan:', error.message);
    return null;
  }
};

// TODO: Implement router.
// export const getMatchingLendingPosts = async (userId) => {
//   try {
//     // Call the SQL function 'get_matching_lending_posts' using supabase.rpc()
//     const { data, error } = await supabase.rpc('get_matching_lending_posts', {
//       _user_id: userId,
//     });

//     if (error) {
//       console.error('Error fetching matching lending posts:', error.message);
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error('Error:', error.message);
//     throw error;
//   }
// };
