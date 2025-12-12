'use client';

import { useState } from 'react';

export default function TestRenderPage() {
  const [status, setStatus] = useState('idle');
  const [imageUrl, setImageUrl] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const runTest = async () => {
    setStatus('loading');
    setLogs([]);
    setImageUrl('');
    addLog("🚀 Starting Test...");

    try {
      // 1. Prepare Dummy Data (This simulates what the Editor would send)
      const payload = {
        templateId: "fashion-01",
        mode: "preview",
        data: {
          businessName: "Timberlands",
          phone: "0712 345 678",
          offer: "HUGE SALE",
          color: "blue",
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        }
      };

      addLog("📦 Sending Payload to /api/render...");

      // 2. Call the API
      const response = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "API returned error");
      }

      addLog("✅ Success! Image generated.");
      addLog(`🔗 URL: ${result.url}`);
      addLog(`🆔 DB ID: ${result.id}`);
      
      setImageUrl(result.url);
      setStatus('success');

    } catch (error: any) {
      console.error(error);
      addLog(`❌ Error: ${error.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-mono">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">🧪 Engine Test</h1>
        <p className="text-gray-500 mb-6">Click below to generate a real poster via Puppeteer.</p>

        <button 
          onClick={runTest}
          disabled={status === 'loading'}
          className="bg-black text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {status === 'loading' ? 'Rendering (Wait 3-5s)...' : 'Run Render Test'}
        </button>

        {/* Console Output */}
        <div className="mt-8 bg-gray-900 text-green-400 p-4 rounded-lg text-sm min-h-[150px]">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{`> ${log}`}</div>
          ))}
        </div>

        {/* Result Image */}
        {imageUrl && (
          <div className="mt-8 border-2 border-dashed border-gray-300 p-4 rounded-xl text-center">
            <h3 className="font-bold mb-2">Result from Supabase:</h3>
            <img src={imageUrl} alt="Generated" className="max-w-xs mx-auto shadow-2xl rounded-lg border border-gray-200" />
          </div>
        )}
      </div>
    </div>
  );
}