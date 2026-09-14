import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

let prisma: PrismaClient | null = null;
let isPrismaAvailable = false;

try {
  if (config.databaseUrl && !config.databaseUrl.includes('your-supabase-project')) {
    prisma = new PrismaClient();
    isPrismaAvailable = true;
  }
} catch (err) {
  console.warn('Prisma PostgreSQL initialization skipped. Using in-memory fallback store.');
  isPrismaAvailable = false;
}

export const supabase = (config.supabaseUrl && config.supabaseAnonKey)
  ? createClient(config.supabaseUrl, config.supabaseAnonKey)
  : null;

export { prisma, isPrismaAvailable };
