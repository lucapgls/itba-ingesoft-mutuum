import { supabase } from '../../supabase_config.js';
import { v4 as uuidv4 } from 'uuid';


export const fetchLoans = async () => {

  try {
    const { data, error } = await supabase
      .from('lending_post')
      .select('*');

    if (error) {
      console.error('Error fetching loans:', error.message);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


export const fetchLoansById = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('lending_post')
      .select('*')
      .eq('lender_id', userId);

    if (error) {
      console.error(`Error fetching loans for user ${userId}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const fetchLoanRequirements = async (lendingPostId) => {
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


export const createLendingPost = async (lenderId, initialAmount, interest, deadline, emailRequired, phoneRequired) => {
  try {
    const { data, error } = await supabase.rpc('create_lending_post_with_requirements', {
      _lender_id: lenderId,
      _initial_amount: initialAmount,
      _interest: interest,
      _deadline: deadline,
      _email_required: emailRequired,
      _phone_required: phoneRequired,
    });

    if (error) {
      console.error('Error creating lending post:', error.message);
      return null;
    }

    return data; // Return the created lending post's ID
  } catch (error) {
    console.error('Error creating lending post:', error.message);
    return null;
  }
};


export const createLoanRequirements = async (lendingPostId, requirements) => {
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
