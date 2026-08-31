import { supabase } from '../config/supabaseClient.js';

// Middleware to verify Supabase JWT
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Unauthorized access', error: error?.message });
    }

    // Attach user payload to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
