// Example Controller for Authentication / User actions
import { supabase } from '../config/supabaseClient.js';

export const getProfile = async (req, res, next) => {
  try {
    const { user } = req; // Assuming user is injected by authMiddleware
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    res.json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};
