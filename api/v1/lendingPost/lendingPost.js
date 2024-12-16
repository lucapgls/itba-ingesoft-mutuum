import { supabase } from '../../supabase_config.js';



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

export const fetchLendingPostById = async (id) => {

  try {
    const { data, error } = await supabase
      .from('lending_post')
      .select('*')
      .eq('id', id);

    if (error) {
      console.error('Error fetching lending posts:', error.message);
      throw error;
      }
    return data;
  }
  catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


export const fetchActiveLendingPosts = async () => {
  try {
    // Step 1: Fetch all lending_post_ids that have active loans
    const { data, error } = await supabase
  .rpc('get_active_lending_posts');

  if (error) {
  console.error('Error fetching active lending posts:', error);
} 
    return data;
  } catch (error) {
    console.error('Error:', error.message);  // Provide a more informative error message
    throw error;
  }
};

export const fetchLendingPostByLenderId = async (userId) => {
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

   
const requirements = data.map(req => {
  const requirementNames = [];
  if (req.email_required) requirementNames.push('Email Required');
  if (req.phone_required) requirementNames.push('Phone Required');
  if (req.dni_required) requirementNames.push('DNI Required');

  return {
    name: requirementNames.join(', '),
    completed: req.email_required || req.phone_required || req.dni_required,
  };
});

return requirements;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const createLendingPost = async (lenderId, initialAmount, availableAmount, interest, deadline, installments) => {
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
        quotas: installments,
       
      }])
      .select();

      
    if (error) {
      console.error('Error creating lending post:', error);
      throw error;
    }

    const lendingPostId = data?.[0]?.id;

  // Desplegar el contrato asociado
  const contractAddress = await deployContract(initialAmount, interest, deadline);
  console.log(`Contrato desplegado para lending post ${lendingPostId}: ${contractAddress}`);

  // Guardar el contrato en la base de datos
  const { error: contractError } = await supabase.from('contracts').insert([
    {
      contract_address: contractAddress,
      user_id: lenderId,
    },
  ]);

  if (contractError) {
    console.error('Error guardando el contrato en la base de datos:', contractError.message);
    throw contractError;
  }

    return lendingPostId;

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
      dni_required: requirements.find(req => req.name === 'DNI Required')?.completed || false,
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

    // Obtener la dirección del contrato asociado al lending post
      const { data: contractData, error: contractError } = await supabase
      .from('contracts')
      .select('contract_address')
      .eq('contract_address', lendingPostId);

      if (contractError || !contractData || contractData.length === 0) {
      console.error('Error obteniendo el contrato asociado:', contractError?.message || 'No se encontró contrato');
      throw contractError || new Error('No se encontró contrato para el lending post');
      }

      const contractAddress = contractData[0].contract_address;

      // Llamar a la función takeLoanContract
      await takeLoanContract(contractAddress, borrowerId, loanAmount);


      // Loan logic:
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