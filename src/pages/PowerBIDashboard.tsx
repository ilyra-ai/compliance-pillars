
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import PowerBIDashboard from '@/components/dashboard/PowerBIDashboard';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Save, 
  Download, 
  FileUp, 
  Database
} from 'lucide-react';
import { toast } from 'sonner';

export default function PowerBIDashboardPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleSaveDashboard = (dashboard: any) => {
    // In a real app, this would save to a database
    toast.success('Dashboard salvo com sucesso!');
    console.log('Dashboard saved:', dashboard);
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button onClick={() => toast.success('Dashboard exportado!')} variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button onClick={() => toast.success('Dashboard salvo!')} size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar
      </Button>
    </>
  );
  
  return (
    <PageLayout 
      title="Dashboard Interativo" 
      description="Crie dashboards personalizados estilo Power BI"
      actions={actions}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4 mb-8 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Interativo</h2>
            <p className="text-muted-foreground">
              Crie visualizações personalizadas com dados externos e internos
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Importar Arquivo CSV
            </Button>
            <Button variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Conectar Banco de Dados
            </Button>
          </div>
        </div>
        
        <PowerBIDashboard onSave={handleSaveDashboard} />
      </div>
    </PageLayout>
  );
}
