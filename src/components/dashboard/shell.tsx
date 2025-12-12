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
    <div className="min-h-screen">
      {/* Navbar gets the toggle function */}
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Sidebar gets the toggle function and state */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
      />

      {/* Main Content Area */}
      <main 
        className={`pt-28 pb-12 px-4 md:px-8 min-h-screen
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${sidebarOpen ? "md:ml-72" : "md:ml-28"}`} 
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}