
import React, { useEffect, useState } from 'react';
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
import { Settings, Palette, FileText, Plus, PanelLeftOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };

  const handleOpenDocumentEditor = () => {
    navigate('/documents/editor');
  };

  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };

  const handleAddPillar = () => {
    navigate('/pillars/new');
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
        </main>

        {/* Theme Customization Dialog */}
        <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Personalizar UI</DialogTitle>
              <DialogDescription>
                Personalize as cores, fontes e elementos da interface
              </DialogDescription>
            </DialogHeader>
            <ThemeConfigurator onSave={handleSaveTheme} />
          </DialogContent>
        </Dialog>
        
        {/* Floating Theme Button */}
        <FloatingThemeButton onClick={handleOpenUITheme} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
