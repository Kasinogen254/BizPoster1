import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Disable prefetch for Serverless environments (Supabase/Neon)
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });