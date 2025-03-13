
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '@/components/ui/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import ReportBuilder from '@/components/reports/ReportBuilder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Plus } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpenUITheme } = useThemeDialog();

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handleOpenDocumentEditor = () => {
    navigate('/documents/editor');
  };

  const handleAddPillar = () => {
    navigate('/pillars/new');
  };

  const actions = (
    <>
      <Button onClick={handleOpenDocumentEditor} variant="outline" size="sm">
        <FileText className="mr-2 h-4 w-4" />
        Editor de Documentos
      </Button>
      <ThemeButton onClick={handleOpenUITheme} />
      <Button onClick={handleOpenSettings} variant="outline" size="sm">
        <Settings className="mr-2 h-4 w-4" />
        Configurações
      </Button>
    </>
  );

  return (
    <PageLayout title="Gestão de Compliance" actions={actions}>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Construtor de Relatórios</CardTitle>
              <CardDescription>Crie e personalize relatórios para seu programa de compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <ReportBuilder />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts">
          <ChartConfigurator />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Index;
