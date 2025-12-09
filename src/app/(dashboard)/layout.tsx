import { ReactNode } from 'react';

// For SEO purposes
export const metadata = {
  title: 'BizPoster Dashboard',
  description: 'Manage your marketing materials',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#F9F9F9] dark:bg-[#0F0F0F] min-h-screen">
      {children}
    </div>
  );
}