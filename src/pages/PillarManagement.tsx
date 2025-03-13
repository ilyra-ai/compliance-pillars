
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PillarContent from '@/components/ui/PillarContent';
import { SidebarProvider } from '@/components/ui/sidebar';

const PillarManagement: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64">
          <PillarContent />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PillarManagement;
