import { supabase } from '../../supabase_config.js';
import { deployContract} from '../contracts/contractQueries.js';

// Función para crear y registrar un contrato en la base de datos
export const createAndRegisterContract = async (lendingPostId, initialAmount, interest, deadline, lenderId) => {
  try {
    // Desplegar el contrato
    const contractAddress = await deployContract(initialAmount, interest, deadline);
    console.log(`Contrato desplegado para lending post ${lendingPostId}: ${contractAddress}`);

    // Guardar el contrato en la base de datos
    const { error } = await supabase.from('contracts').insert([
      {
        contract_address: contractAddress,
        user_id: lenderId,
      },
    ]);

    if (error) {
      console.error('Error guardando el contrato en la base de datos:', error.message);
      throw error;
    }

    return contractAddress;
  } catch (error) {
    console.error('Error en createAndRegisterContract:', error.message);
    throw error;
  }
};


export const fetchloan = async () => {
      try {
     const { data, error } = await supabase
        .from('loan')
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
    }


export const fetchLoanById = async (id) => {
      try {
     const { data, error } = await supabase
        .from('loan')
        .select('*')
        .eq('id', id);
    
     if (error) {
        console.error(`Error fetching loan for user ${id}:`, error);
        throw error;
     }
    
     return data;
      } catch (error) {
     console.error('Error:', error);
     throw error;
      }
    }

export const fetchLoanByLendingPostId = async (lendingPostId) => {
      try {
     const { data, error } = await supabase
        .from('loan')
        .select('*')
        .eq('lending_post_id', lendingPostId);
    
     if (error) {
        console.error(`Error fetching loan for lending post ${lendingPostId}:`, error);
        throw error;
     }
    
     return data;
      } catch (error) {
     console.error('Error:', error);
     throw error;
      }
    }

export const createLoan = async (lendingPostId, borrowerId, loanAmount) => {
   const createdAt = new Date().toISOString();
   try {

  // Crear y registrar el contrato asociado
    await createAndRegisterContract(lendingPostId, initialAmount, interest, deadline, lenderId);


     const { data, error } = await supabase
       .from('loan')
       .insert([{ 
         lending_post_id: lendingPostId, 
         borrower_id: borrowerId, 
         amount: loanAmount, 
         created_at: createdAt,
         fees_paid: 0, 
         is_paid: false,
      }]);
 
     if (error) {
       console.error('Error creating loan:', error.message);
       throw error;
     }
 
     return data;
   } catch (error) {
     console.error('Error:', error.message);
     throw error;
   }
}

export const updateFeesPaid = async (loanId, feesPaid) => {

   try {
     const { data, error } = await supabase
       .from('loan')
       .update({ 
         fees_paid: feesPaid, 
      })
       .eq('id', loanId);
 
     if (error) {
       console.error('Error updating fees paid:', error.message);
       throw error;
     }
 
     return data;
   } catch (error) {
     console.error('Error:', error.message);
     throw error;
   }

}