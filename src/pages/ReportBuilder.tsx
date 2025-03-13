
import React from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import ReportBuilderComponent from '@/components/reports/ReportBuilder';

const ReportBuilder: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Construtor de Relatórios</h1>
        <ReportBuilderComponent />
      </div>
    </div>
  );
};

export default ReportBuilder;
