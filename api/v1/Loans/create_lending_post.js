import { supabase } from '../../supabase_config.js';

// Load environment variables
config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle the creation of a lending post
export const createLendingPostHandler = async (req, res) => {
  const { lenderId, initialAmount, interest, deadline } = req.body;

  if (!lenderId || !initialAmount || !interest || !deadline) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase.from("lending_post").insert([
      {
        lender_id: lenderId,
        initial_amount: initialAmount,
        available_amount: initialAmount,
        interest: interest,
        dead_line: deadline,
      },
    ]);

    if (error) {
      console.error("Error creating lending post:", error.message);
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error("Internal server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
