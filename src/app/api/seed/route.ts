import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { templates } from '@/src/db/schema';

export async function GET() {
  try {
    // 1. Define some starter templates
    // In the future, you will build an Admin Panel to upload these.
    const starterTemplates = [
      {
        title: "Flash Sale Friday",
        description: "High impact red and black design for urgent sales.",
        imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
        category: "Sales",
        format: "SQUARE" as const,
        isPremium: false,
        isDigital: true,
        // This JSON defines what is editable on the poster. 
        // We will build the Editor to read this later.
        config: {
          background: "#D93025",
          layers: [
            { type: "text", content: "FLASH SALE", x: 50, y: 100, fontSize: 60, color: "#FFFFFF" },
            { type: "text", content: "50% OFF", x: 50, y: 200, fontSize: 80, color: "#FFD700" }
          ]
        }
      },
      {
        title: "We Are Hiring",
        description: "Professional corporate aesthetic for job postings.",
        imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
        category: "Hiring",
        format: "VERTICAL" as const,
        isPremium: true,
        isDigital: false,
        config: {
          background: "#FFFFFF",
          layers: [
            { type: "text", content: "WE ARE HIRING", x: 100, y: 100, fontSize: 40, color: "#000000" },
            { type: "text", content: "Join Our Team", x: 100, y: 150, fontSize: 24, color: "#666666" }
          ]
        }
      },
      {
        title: "Morning Motivation",
        description: "Clean aesthetic for daily quotes.",
        imageUrl: "https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?auto=format&fit=crop&q=80&w=800",
        category: "Motivation",
        format: "VERTICAL" as const,
        isPremium: false,
        isDigital: true,
        config: {
          background: "#F5F5F5",
          layers: [
            { type: "text", content: "Dream Big", x: 150, y: 300, fontSize: 50, color: "#333333" }
          ]
        }
      },
      {
        title: "New Stock Alert",
        description: "Showcase new arrivals with style.",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
        category: "Business",
        format: "SQUARE" as const,
        isPremium: true,
        isDigital: true,
        config: {
          background: "#000000",
          layers: [
            { type: "text", content: "NEW ARRIVALS", x: 50, y: 50, fontSize: 40, color: "#FFFFFF" }
          ]
        }
      }
    ];

    // 2. Insert them into Drizzle
    await db.insert(templates).values(starterTemplates);

    return NextResponse.json({ success: true, message: "Database seeded with 4 templates!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed DB" }, { status: 500 });
  }
}