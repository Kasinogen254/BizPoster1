import { ReactNode } from 'react';

export const metadata = {
  title: 'BizPoster Studio',
  description: 'Manage your marketing materials',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      {/* 1. Subtle Dot Pattern Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
      
      {/* 2. Soft Gradient Blobs for Mood (Top Right & Bottom Left) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2 z-0" />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}