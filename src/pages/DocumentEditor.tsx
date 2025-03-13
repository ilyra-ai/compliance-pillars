
import React from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import WYSIWYGEditor from '@/components/editor/WYSIWYGEditor';

const DocumentEditor: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Editor de Documentos</h1>
        <WYSIWYGEditor />
      </div>
    </div>
  );
};

export default DocumentEditor;
