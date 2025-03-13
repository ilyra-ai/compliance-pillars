
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/ui/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import ReportBuilder from '@/components/reports/ReportBuilder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Settings, Palette, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handleOpenUITheme = () => {
    navigate('/settings/ui');
  };

  const handleOpenDocumentEditor = () => {
    navigate('/documents/editor');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Gestão de Compliance</h1>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleOpenDocumentEditor} variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Editor de Documentos
              </Button>
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
              <Button onClick={handleOpenSettings} variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
            </div>
          </div>

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

          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleOpenUITheme}
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition"
            >
              <Palette size={16} className="mr-2" />
              Personalizar UI
            </button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
