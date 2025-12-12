import { pgTable, text, boolean, timestamp, jsonb, uuid, pgEnum, integer } from 'drizzle-orm/pg-core';

// --- ENUMS ---
// We define these so we can enforce specific values
export const formatEnum = pgEnum('format', ['SQUARE', 'VERTICAL']);
export const planEnum = pgEnum('plan', ['FREE', 'PRO_WEEKLY', 'PRO_MONTHLY']);

// --- USERS TABLE ---
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username'),
  password: text('password'), // Optional (if using Google)
  image: text('image'),
  
  // Auth & Onboarding
  emailVerified: timestamp('email_verified'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  
  // Business Profile
  businessName: text('business_name'),
  industry: text('industry'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- TEMPLATES (The Product) ---
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  
  category: text('category').notNull(),
  format: formatEnum('format').default('SQUARE'),
  
  isPremium: boolean('is_premium').default(false),
  isDigital: boolean('is_digital').default(true),
  
  // The magic "Canvas" config stored as JSON
  config: jsonb('config').notNull(),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- PROJECTS (User's Saved Work) ---
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  
  // Relations (Foreign Keys)
  userId: uuid('user_id').references(() => users.id).notNull(),
  templateId: uuid('template_id').references(() => templates.id).notNull(),
  
  // User's specific edits
  customConfig: jsonb('custom_config').notNull(),
  thumbnailUrl: text('thumbnail_url'),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- SUBSCRIPTIONS ---
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull().unique(),
  
  plan: planEnum('plan').default('FREE'),
  startDate: timestamp('start_date').defaultNow(),
  endDate: timestamp('end_date'),
  
  isActive: boolean('is_active').default(true),
});
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(), // The email address
  token: text('token').notNull(),         // The 6-digit code
  expires: timestamp('expires').notNull(),
});
export const generatedPosters = pgTable('generated_posters', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  templateId: text('template_id').notNull(), // We use text IDs for templates (e.g. 'fashion-01')
  
  // File Info
  filePath: text('file_path').notNull(), // Path in Supabase Storage
  publicUrl: text('public_url'),         // Direct link
  
  // Metadata
  mode: text('mode').notNull(), // 'preview' or 'hd'
  width: integer('width'),
  height: integer('height'),
  
  createdAt: timestamp('created_at').defaultNow(),
});