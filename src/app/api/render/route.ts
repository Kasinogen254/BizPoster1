import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import puppeteer from 'puppeteer';
import { z } from 'zod';
import { db } from '@/src/db';
import { generatedPosters } from '@/src/db/schema';
import { supabaseAdmin } from '@/src/lib/supabase';
import { getPosterHtml } from '@/src/templates/core';

// Validation Schema
const renderSchema = z.object({
  templateId: z.string(),
  mode: z.enum(['preview', 'hd']).default('preview'),
  data: z.object({
    businessName: z.string(),
    phone: z.string(),
    offer: z.string(),
    color: z.string().default('blue'),
    imageUrl: z.string().url(),
  }),
});

export async function POST(req: NextRequest) {
  let browser = null;

  try {
    // 1. Authentication Check
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Body & Validation
    const body = await req.json();
    const validation = renderSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { templateId, mode, data } = validation.data;
    const isPreview = mode === 'preview';

    // 3. Launch Puppeteer (The Browser)
    // Note: In production (Vercel), we need different args. 
    // This setup works for Local Development (Linux/Mac/Windows).
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // 4. Set Viewport (Dimensions)
    const width = 1080;
    const height = 1350;
    // If preview, we can render smaller to save speed, or render full and resize.
    // Let's render full for accuracy.
    await page.setViewport({ width, height, deviceScaleFactor: isPreview ? 1 : 2 });

    // 5. Generate HTML & Load into Page
    const html = getPosterHtml(templateId, data, isPreview);
    await page.setContent(html, { waitUntil: 'networkidle0' }); // Wait for images/fonts

    // 6. Take Screenshot
    const buffer = await page.screenshot({
      type: 'jpeg',
      quality: isPreview ? 60 : 100, // Low quality for preview
      fullPage: true,
    });

    // 7. Upload to Supabase Storage
    const fileName = `${session.user.id}/${templateId}/${Date.now()}_${mode}.jpg`;
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('posters')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) throw new Error(uploadError.message);

    // 8. Get Public URL
    const { data: urlData } = supabaseAdmin
      .storage
      .from('posters')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    // 9. Record in Database
    const [record] = await db.insert(generatedPosters).values({
      userId: session.user.id,
      templateId,
      filePath: fileName,
      publicUrl,
      mode,
      width: isPreview ? width : width * 2,
      height: isPreview ? height : height * 2,
    }).returning();

    return NextResponse.json({ 
      success: true, 
      url: publicUrl, 
      id: record.id 
    });

  } catch (error: any) {
    console.error("Render Error:", error);
    return NextResponse.json({ error: error.message || "Failed to render" }, { status: 500 });
  } finally {
    // 10. ALWAYS close the browser to prevent memory leaks
    if (browser) await browser.close();
  }
}