'use client';

import { useState } from 'react';
import { DashboardNavbar } from './navbar';
import { Sidebar } from './sidebar';

interface ShellProps {
  children: React.ReactNode;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function DashboardShell({ children, activeCategory, setActiveCategory }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
      />

      <main 
        className={`pt-20 pb-12 px-4 md:px-8 transition-all duration-300 min-h-screen
        ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}