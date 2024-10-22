import { supabase } from '../../supabase_config.js';

export const askForLoan = async (userId, lendingPostId) => {
    try {
        // Call the append_loan_id function via RPC
        const { data, error } = await supabase
            .rpc('append_loan_id', {
                lending_post_id: lendingPostId,
                user_id: userId
            });

        // Log both data and error to understand if there's a problem
        console.log('RPC Response:', { data, error });

        if (error) {
            console.error('Error asking for loan:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getAskForLoanIds = async (lendingPostId) => {
    try {
        const { data, error } = await supabase
            .from('lending_post')
            .select('asking_for_loan_ids')
            .eq('id', lendingPostId);

        if (error) {
            console.error('Error fetching loan ids:', error);
            throw error;
        }

        return data[0].asking_for_loan_ids;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
