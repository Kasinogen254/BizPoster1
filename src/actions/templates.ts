'use server';

import { db } from '@/src/db';
import { templates } from '@/src/db/schema';
import { desc, eq, and } from 'drizzle-orm';

export async function getTemplates(category: string = "All", format: string = "all") {
  try {
    // 1. Start building the query
    const query = db.select().from(templates);

    // 2. Apply Filters (if not "All")
    // Note: This is a simplified filtering logic. Drizzle queries are powerful.
    
    // Fetch everything first (for simplicity in this step) 
    // In a huge app, you would add .where() clauses dynamically here.
    const allTemplates = await query.orderBy(desc(templates.createdAt));

    // 3. Filter in memory (Fast enough for < 1000 items)
    const filtered = allTemplates.filter((t) => {
      const catMatch = category === "All" || t.category === category;
      const formatMatch = format === "all" || t.format.toLowerCase() === format.toLowerCase();
      return catMatch && formatMatch;
    });

    return { data: filtered };

  } catch (error) {
    console.error("Error fetching templates:", error);
    return { error: "Failed to load templates" };
  }
}