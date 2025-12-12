interface TemplateData {
  businessName: string;
  phone: string;
  offer: string;
  color: string;
  imageUrl: string;
}

export function getPosterHtml(templateId: string, data: TemplateData, isPreview: boolean) {
  // 1. Define the Watermark Overlay CSS
  const watermarkCss = isPreview ? `
    .watermark {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><text x="20" y="100" font-size="24" fill="rgba(0,0,0,0.1)" transform="rotate(-45 20 100)">BIZPOSTER PREVIEW</text></svg>');
      pointer-events: none;
      z-index: 9999;
    }
  ` : '';

  // 2. The Base HTML Wrapper
  // We use Tailwind via CDN for the generator so it looks good instantly
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { margin: 0; padding: 0; box-sizing: border-box; }
        .poster-container { 
            width: 1080px; 
            height: 1350px; 
            position: relative; 
            overflow: hidden; 
            background: white;
        }
        ${watermarkCss}
        /* Custom Font Injection could go here */
      </style>
    </head>
    <body>
      <div class="poster-container">
        ${getTemplateDesign(templateId, data)}
        ${isPreview ? '<div class="watermark"></div>' : ''}
      </div>
    </body>
    </html>
  `;
}

// 3. specific Designs
function getTemplateDesign(id: string, data: TemplateData) {
  // Simple switch to support multiple designs
  switch (id) {
    case 'fashion-01':
      return `
        <div class="w-full h-full flex flex-col relative">
           <!-- Background Image -->
           <img src="${data.imageUrl}" class="absolute inset-0 w-full h-full object-cover" />
           
           <!-- Overlay Gradient -->
           <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
           
           <!-- Content -->
           <div class="relative z-10 flex flex-col h-full justify-between p-12 text-white">
              <!-- Top -->
              <div class="flex justify-between items-center">
                 <h2 class="text-4xl font-bold tracking-wider uppercase">${data.businessName}</h2>
                 <div class="bg-white text-black px-6 py-2 font-bold rounded-full text-xl">NEW ARRIVAL</div>
              </div>

              <!-- Bottom -->
              <div class="mb-12">
                 <h1 class="text-8xl font-black mb-4 leading-tight">${data.offer}</h1>
                 <div class="w-32 h-2 bg-${data.color}-500 mb-6"></div>
                 <p class="text-3xl font-medium flex items-center gap-4">
                    <span>📞 Order Now:</span>
                    <span class="font-bold text-${data.color}-400">${data.phone}</span>
                 </p>
              </div>
           </div>
        </div>
      `;
    
    default:
      return `<div class="p-20"><h1>Template Not Found</h1></div>`;
  }
}