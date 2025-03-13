
import React from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import ChartConfigurator from '@/components/charts/ChartConfigurator';

const ChartManagement: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Gerenciamento de Gráficos</h1>
          <ChartConfigurator />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChartManagement;
