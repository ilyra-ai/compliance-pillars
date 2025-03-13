
import React from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import ReportBuilderComponent from '@/components/reports/ReportBuilder';
import { SidebarProvider } from '@/components/ui/sidebar';

const ReportBuilder: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Construtor de Relatórios</h1>
          <ReportBuilderComponent />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ReportBuilder;
