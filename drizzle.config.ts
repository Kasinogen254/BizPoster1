import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/db/schema.ts', // Where we define tables
  out: './drizzle',             // Where migration files go
  dialect: 'postgresql',        // We are using Postgres
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});